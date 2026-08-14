<?php

declare(strict_types=1);

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const MAX_REQUEST_BYTES = 24000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_SECONDS = 900;

function respond_json(array $body, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

function clean_text(mixed $value, int $maxLength): string
{
    if (!is_string($value)) {
        return '';
    }

    $cleaned = preg_replace('/\s+/u', ' ', trim($value));
    if (!is_string($cleaned)) {
        return '';
    }

    return function_exists('mb_substr')
        ? mb_substr($cleaned, 0, $maxLength)
        : substr($cleaned, 0, $maxLength);
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function load_email_config(): array
{
    $documentRoot = (string) ($_SERVER['DOCUMENT_ROOT'] ?? '');
    $configPath = dirname(rtrim($documentRoot, '/\\')) . DIRECTORY_SEPARATOR . 'circle-email-config.php';
    $config = [];

    if (is_readable($configPath)) {
        $loadedConfig = require $configPath;
        if (is_array($loadedConfig)) {
            $config = $loadedConfig;
        }
    }

    foreach (['RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'READINESS_NOTIFICATION_EMAIL', 'ALLOWED_ORIGINS'] as $key) {
        $environmentValue = getenv($key);
        if (is_string($environmentValue) && $environmentValue !== '') {
            $config[$key] = $environmentValue;
        }
    }

    return $config;
}

function allowed_origins(mixed $configuredOrigins): array
{
    if (is_array($configuredOrigins)) {
        return array_values(array_filter(array_map('trim', $configuredOrigins)));
    }

    if (is_string($configuredOrigins) && $configuredOrigins !== '') {
        return array_values(array_filter(array_map('trim', explode(',', $configuredOrigins))));
    }

    return [
        'https://circlehqcompany.com',
        'https://www.circlehqcompany.com',
    ];
}

function rate_limit_exceeded(): bool
{
    $clientIp = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $rateLimitFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'circle-readiness-' . hash('sha256', $clientIp) . '.json';
    $handle = @fopen($rateLimitFile, 'c+');

    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return false;
    }

    $now = time();
    $contents = stream_get_contents($handle);
    $timestamps = is_string($contents) ? json_decode($contents, true) : [];
    $timestamps = is_array($timestamps) ? $timestamps : [];
    $timestamps = array_values(array_filter(
        $timestamps,
        static fn (mixed $timestamp): bool => is_int($timestamp) && $timestamp > $now - RATE_LIMIT_WINDOW_SECONDS,
    ));

    $limited = count($timestamps) >= RATE_LIMIT_MAX_REQUESTS;
    if (!$limited) {
        $timestamps[] = $now;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($timestamps));
        fflush($handle);
    }

    flock($handle, LOCK_UN);
    fclose($handle);

    return $limited;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond_json(['error' => 'Method not allowed.'], 405);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > MAX_REQUEST_BYTES) {
    respond_json(['error' => 'Request is too large.'], 413);
}

$config = load_email_config();
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
if ($origin !== '' && !in_array($origin, allowed_origins($config['ALLOWED_ORIGINS'] ?? null), true)) {
    respond_json(['error' => 'Origin not allowed.'], 403);
}

if (rate_limit_exceeded()) {
    respond_json(['error' => 'Too many email requests. Please try again later.'], 429);
}

$apiKey = clean_text($config['RESEND_API_KEY'] ?? null, 300);
$fromEmail = clean_text($config['RESEND_FROM_EMAIL'] ?? null, 320);
$notificationEmail = clean_text(
    $config['READINESS_NOTIFICATION_EMAIL'] ?? 'hello@circlehqcompany.com',
    254,
);

if ($apiKey === '' || $fromEmail === '') {
    error_log('Circle HQ email delivery is missing its Resend configuration.');
    respond_json(['error' => 'Email delivery is not configured.'], 503);
}

$rawBody = file_get_contents('php://input');
$payload = is_string($rawBody) ? json_decode($rawBody, true) : null;
if (!is_array($payload)) {
    respond_json(['error' => 'Invalid request body.'], 400);
}

$name = clean_text($payload['user_name'] ?? null, 100);
$email = strtolower(clean_text($payload['user_email'] ?? null, 254));
$phone = clean_text($payload['user_phone'] ?? null, 40);
$company = clean_text($payload['user_company'] ?? null, 120);
$tierName = clean_text($payload['tier_name'] ?? null, 80);
$tierDescription = clean_text($payload['tier_desc'] ?? null, 1500);
$score = filter_var($payload['total_score'] ?? null, FILTER_VALIDATE_INT);
$maxScore = filter_var($payload['max_score'] ?? null, FILTER_VALIDATE_INT);
$rawInsights = is_array($payload['insights'] ?? null) ? array_slice($payload['insights'], 0, 5) : [];
$insights = array_values(array_filter(array_map(
    static fn (mixed $insight): string => clean_text($insight, 1500),
    $rawInsights,
)));

if ($name === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond_json(['error' => 'Please provide a valid name and email address.'], 400);
}

$expectedTier = is_int($score)
    ? ($score <= 16 ? 'AI Foundation Stage' : ($score <= 26 ? 'AI Exploration Stage' : 'AI Implementation Ready'))
    : '';

if (
    !is_int($score)
    || $score < 0
    || $score > 40
    || $maxScore !== 40
    || $tierName !== $expectedTier
    || $tierDescription === ''
    || count($insights) === 0
) {
    respond_json(['error' => 'The readiness report data is invalid.'], 400);
}

$safeName = escape_html($name);
$safeEmail = escape_html($email);
$safePhone = escape_html($phone !== '' ? $phone : 'Not provided');
$safeCompany = escape_html($company !== '' ? $company : 'Not provided');
$safeTierName = escape_html($tierName);
$safeTierDescription = escape_html($tierDescription);
$insightItems = implode('', array_map(
    static fn (string $insight): string => '<li style="margin:0 0 12px;line-height:1.65;color:#3f3f46">' . escape_html($insight) . '</li>',
    $insights,
));

$subject = "Your AI Readiness Score: {$score}/{$maxScore} ({$tierName})";
$html = <<<HTML
<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b">
    <div style="display:none;max-height:0;overflow:hidden">Your Circle HQ AI readiness report is ready.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:32px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e4e4e7">
          <tr><td style="background:#0a0a0a;padding:28px 32px">
            <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#ef4444;font-weight:700">Circle HQ</div>
            <h1 style="margin:10px 0 0;color:#ffffff;font-size:25px;line-height:1.3">Your AI Readiness Report</h1>
          </td></tr>
          <tr><td style="padding:32px">
            <p style="margin:0 0 18px;line-height:1.65">Hello {$safeName},</p>
            <p style="margin:0 0 24px;line-height:1.65;color:#52525b">Thank you for completing the Circle HQ AI Readiness Assessment.</p>
            <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:14px;padding:22px;margin-bottom:24px">
              <div style="font-size:36px;font-weight:800;color:#cc0000">{$score} / {$maxScore}</div>
              <div style="margin-top:6px;font-size:17px;font-weight:700">{$safeTierName}</div>
            </div>
            <p style="margin:0 0 26px;line-height:1.7;color:#3f3f46">{$safeTierDescription}</p>
            <h2 style="font-size:17px;margin:0 0 14px">Key operational insights</h2>
            <ol style="padding-left:22px;margin:0 0 28px">{$insightItems}</ol>
            <div style="border-top:1px solid #e4e4e7;padding-top:20px;font-size:13px;line-height:1.7;color:#71717a">
              <strong style="color:#3f3f46">Contact details submitted</strong><br>
              Name: {$safeName}<br>
              Email: {$safeEmail}<br>
              Phone: {$safePhone}<br>
              Company: {$safeCompany}
            </div>
          </td></tr>
          <tr><td style="background:#fafafa;padding:22px 32px;font-size:13px;line-height:1.6;color:#71717a">
            Best regards,<br><strong style="color:#18181b">Flora Nnamaka &amp; The Circle HQ Team</strong><br>
            <a href="mailto:hello@circlehqcompany.com" style="color:#cc0000">hello@circlehqcompany.com</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>
HTML;

$textInsights = implode("\n", array_map(
    static fn (string $insight, int $index): string => ($index + 1) . '. ' . $insight,
    $insights,
    array_keys($insights),
));
$text = "Hello {$name},\n\n"
    . "Thank you for completing the Circle HQ AI Readiness Assessment.\n\n"
    . "YOUR AI READINESS SCORE: {$score} / {$maxScore}\n"
    . "STAGE: {$tierName}\n\n{$tierDescription}\n\n"
    . "KEY OPERATIONAL INSIGHTS:\n{$textInsights}\n\n"
    . "Contact details submitted:\nName: {$name}\nEmail: {$email}\n"
    . 'Phone: ' . ($phone !== '' ? $phone : 'Not provided') . "\n"
    . 'Company: ' . ($company !== '' ? $company : 'Not provided') . "\n\n"
    . "Best regards,\nFlora Nnamaka & The Circle HQ Team\nhello@circlehqcompany.com";

$requestBody = json_encode([
    'from' => $fromEmail,
    'to' => [$email],
    'bcc' => [$notificationEmail],
    'reply_to' => $notificationEmail,
    'subject' => $subject,
    'html' => $html,
    'text' => $text,
    'tags' => [['name' => 'email_type', 'value' => 'readiness_report']],
], JSON_UNESCAPED_SLASHES);

if (!is_string($requestBody) || !function_exists('curl_init')) {
    error_log('Circle HQ email delivery could not initialize cURL.');
    respond_json(['error' => 'Email delivery is temporarily unavailable.'], 503);
}

$curl = curl_init(RESEND_ENDPOINT);
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => $requestBody,
]);

$resendBody = curl_exec($curl);
$resendStatus = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
$curlError = curl_error($curl);
curl_close($curl);

$resendResult = is_string($resendBody) ? json_decode($resendBody, true) : null;
if ($resendStatus < 200 || $resendStatus >= 300) {
    error_log('Resend rejected readiness email. Status: ' . $resendStatus . '; Error: ' . $curlError);
    respond_json(['error' => 'Email delivery failed. Please try again.'], 502);
}

respond_json([
    'success' => true,
    'id' => is_array($resendResult) ? ($resendResult['id'] ?? null) : null,
]);
