<?php

declare(strict_types=1);

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const MAX_REQUEST_BYTES = 16000;
const RATE_LIMIT_MAX_REQUESTS = 8;
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

  foreach (['RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'PRODUCT_ACCESS_FROM_EMAIL', 'READINESS_NOTIFICATION_EMAIL', 'PRODUCT_ACCESS_NOTIFICATION_EMAIL', 'ALLOWED_ORIGINS'] as $key) {
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
  $rateLimitFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'circle-product-access-' . hash('sha256', $clientIp) . '.json';
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
    static fn(mixed $timestamp): bool => is_int($timestamp) && $timestamp > $now - RATE_LIMIT_WINDOW_SECONDS,
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
  respond_json(['error' => 'Too many access requests. Please try again later.'], 429);
}

$apiKey = clean_text($config['RESEND_API_KEY'] ?? null, 300);
$fromEmail = clean_text(
  $config['PRODUCT_ACCESS_FROM_EMAIL'] ?? $config['RESEND_FROM_EMAIL'] ?? null,
  320,
);
$notificationEmail = strtolower(clean_text(
  $config['PRODUCT_ACCESS_NOTIFICATION_EMAIL']
  ?? $config['READINESS_NOTIFICATION_EMAIL']
  ?? 'hello@circlehqcompany.com',
  254,
));

if (
  $apiKey === ''
  || $fromEmail === ''
  || filter_var($notificationEmail, FILTER_VALIDATE_EMAIL) === false
) {
  error_log('Circle HQ product access delivery is missing its email configuration.');
  respond_json(['error' => 'Product access is temporarily unavailable.'], 503);
}

$rawBody = file_get_contents('php://input');
$payload = is_string($rawBody) ? json_decode($rawBody, true) : null;
if (!is_array($payload)) {
  respond_json(['error' => 'Invalid request body.'], 400);
}

$products = [
  'restaurant-ai' => [
    'name' => 'Circle Restaurant AI',
    'url' => 'https://restoai.circlehqcompany.com/',
  ],
  'circle-props' => [
    'name' => 'Circle HQ Props',
    'url' => 'https://pms.circlehqcompany.com/',
  ],
];

$productId = clean_text($payload['product_id'] ?? null, 40);
$name = clean_text($payload['user_name'] ?? null, 100);
$email = strtolower(clean_text($payload['user_email'] ?? null, 254));
$phone = clean_text($payload['user_phone'] ?? null, 30);
$company = clean_text($payload['user_company'] ?? null, 120);
$businessContext = clean_text($payload['business_context'] ?? null, 1200);
$product = $products[$productId] ?? null;

if (
  !is_array($product)
  || $name === ''
  || filter_var($email, FILTER_VALIDATE_EMAIL) === false
  || strlen($businessContext) < 12
) {
  respond_json(['error' => 'Please provide a valid name, email address, and business context.'], 400);
}

function send_resend_email(string $apiKey, array $payload, ?string $idempotencyKey = null): array
{
  if (!function_exists('curl_init')) {
    return ['success' => false, 'error' => 'cURL extension not available.'];
  }

  $requestBody = json_encode($payload, JSON_UNESCAPED_SLASHES);
  if (!is_string($requestBody)) {
    return ['success' => false, 'error' => 'Failed to encode email payload.'];
  }

  $headers = [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json',
  ];
  if ($idempotencyKey !== null && $idempotencyKey !== '') {
    $headers[] = 'Idempotency-Key: ' . $idempotencyKey;
  }

  $curl = curl_init(RESEND_ENDPOINT);
  curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_POSTFIELDS => $requestBody,
  ]);

  $resendBody = curl_exec($curl);
  $resendStatus = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
  $curlError = curl_error($curl);
  curl_close($curl);

  $resendResult = is_string($resendBody) ? json_decode($resendBody, true) : null;
  if ($resendStatus < 200 || $resendStatus >= 300) {
    error_log('Resend rejected product access email to ' . json_encode($payload['to'] ?? []) . '. Status: ' . $resendStatus . '; Error: ' . $curlError . '; Body: ' . (is_string($resendBody) ? $resendBody : ''));
    return ['success' => false, 'status' => $resendStatus, 'error' => $curlError];
  }

  return ['success' => true, 'data' => is_array($resendResult) ? $resendResult : []];
}

$safeName = escape_html($name);
$safeEmail = escape_html($email);
$safePhone = escape_html($phone !== '' ? $phone : 'Not provided');
$safeCompany = escape_html($company !== '' ? $company : 'Not provided');
$safeContext = nl2br(escape_html($businessContext));
$safeProductName = escape_html((string) $product['name']);
$safeProductUrl = escape_html((string) $product['url']);
$userSubject = "Your access to {$product['name']}";

$userHtml = <<<HTML
<!doctype html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
  </head>
  <body style="margin:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b">
    <div style="display:none;max-height:0;overflow:hidden">Your {$safeProductName} access link is ready.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:32px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e4e4e7">
          <tr><td style="background:#09090b;padding:30px 32px">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="font-size:18px;color:#ffffff;font-weight:800"><span style="color:#ef233c">Circle</span>hq</td>
                <td align="right" style="font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#a1a1aa">Product access</td>
              </tr>
            </table>
            <h1 style="margin:24px 0 0;color:#ffffff;font-size:28px;line-height:1.25">Your access is ready.</h1>
            <p style="margin:10px 0 0;color:#a1a1aa;font-size:15px;line-height:1.6">Explore a live system built by Circle HQ.</p>
          </td></tr>
          <tr><td style="padding:32px">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.7">Hello {$safeName},</p>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:#52525b">Thanks for telling us what you are working on. Your private access to <strong style="color:#18181b">{$safeProductName}</strong> is below.</p>

            <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:16px;padding:22px;margin-bottom:24px">
              <div style="font-size:10px;letter-spacing:1.8px;text-transform:uppercase;color:#cc001f;font-weight:700">Live product</div>
              <div style="margin-top:8px;font-size:21px;line-height:1.35;font-weight:800;color:#18181b">{$safeProductName}</div>
            </div>

            <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 30px">
              <tr><td style="border-radius:999px;background:#e0142c">
                <a href="{$safeProductUrl}" target="_blank" style="display:inline-block;padding:14px 24px;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700">Explore {$safeProductName} &nbsp;→</a>
              </td></tr>
            </table>

            <p style="margin:0 0 28px;font-size:13px;line-height:1.65;color:#71717a">This link opens the live product in your browser. Please do not forward this email outside your organisation.</p>

            <div style="border-top:1px solid #e4e4e7;padding-top:24px">
              <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#71717a;font-weight:700">Details you shared</div>
              <p style="margin:14px 0 8px;font-size:14px;line-height:1.65;color:#3f3f46"><strong>Organisation:</strong> {$safeCompany}</p>
              <div style="margin-top:12px;border-left:3px solid #e0142c;padding:2px 0 2px 14px;font-size:14px;line-height:1.7;color:#52525b">{$safeContext}</div>
            </div>
          </td></tr>
          <tr><td style="background:#fafafa;border-top:1px solid #e4e4e7;padding:22px 32px;font-size:13px;line-height:1.7;color:#71717a">
            Questions about the product or your use case? Reply to this email or contact
            <a href="mailto:hello@circlehqcompany.com" style="color:#cc001f;text-decoration:none">hello@circlehqcompany.com</a>.<br>
            <strong style="color:#18181b">Circle HQ</strong> · Smart AI solutions and workforce capability
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>
HTML;

$userText = "Hello {$name},\n\n"
  . "Your access to {$product['name']} is ready.\n\n"
  . "Open the live product:\n{$product['url']}\n\n"
  . "Details you shared:\n"
  . 'Organisation: ' . ($company !== '' ? $company : 'Not provided') . "\n"
  . "What you want to improve: {$businessContext}\n\n"
  . "Questions? Reply to this email or contact hello@circlehqcompany.com.\n\n"
  . "Circle HQ\nSmart AI solutions and workforce capability";

$userPayload = [
  'from' => $fromEmail,
  'to' => [$email],
  'reply_to' => $notificationEmail,
  'subject' => $userSubject,
  'html' => $userHtml,
  'text' => $userText,
  'tags' => [
    ['name' => 'email_type', 'value' => 'product_access_user'],
    ['name' => 'product', 'value' => $productId],
  ],
];

// Distinct HTML and Text template for company notification email
$companySubject = "[Product Access Request] {$product['name']}: {$safeName} ({$safeCompany})";
$companyHtml = <<<HTML
<!doctype html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
  </head>
  <body style="margin:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b">
    <div style="display:none;max-height:0;overflow:hidden">New product access request for {$safeProductName} by {$safeName}.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:32px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e4e4e7">
          <tr><td style="background:#09090b;padding:28px 32px">
            <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#ef233c;font-weight:700">Circle HQ · Lead Notification</div>
            <h1 style="margin:10px 0 0;color:#ffffff;font-size:22px;line-height:1.3">New Product Access Request</h1>
          </td></tr>
          <tr><td style="padding:32px">
            <div style="background:#f4f4f5;border-radius:12px;padding:20px;margin-bottom:24px;border-left:4px solid #e0142c">
              <h2 style="margin:0 0 12px;font-size:16px;color:#18181b">Lead Contact Info</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="4" style="font-size:14px;color:#3f3f46">
                <tr><td width="110"><strong>Name:</strong></td><td>{$safeName}</td></tr>
                <tr><td><strong>Email:</strong></td><td><a href="mailto:{$safeEmail}" style="color:#e0142c;font-weight:600">{$safeEmail}</a></td></tr>
                <tr><td><strong>Phone:</strong></td><td>{$safePhone}</td></tr>
                <tr><td><strong>Company:</strong></td><td>{$safeCompany}</td></tr>
                <tr><td><strong>Requested Product:</strong></td><td><strong style="color:#18181b">{$safeProductName}</strong></td></tr>
              </table>
            </div>

            <div style="border-top:1px solid #e4e4e7;padding-top:20px;margin-bottom:24px">
              <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#71717a;font-weight:700">Business Context / Operational Goals</div>
              <div style="margin-top:10px;border-left:3px solid #e0142c;padding:4px 0 4px 14px;font-size:14px;line-height:1.7;color:#3f3f46;background:#fafafa">{$safeContext}</div>
            </div>

            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px;font-size:13px;color:#1e40af">
              <strong>💡 Quick Action:</strong> Hit <strong>Reply</strong> in your email client to respond directly to {$safeName} ({$safeEmail}).
            </div>
          </td></tr>
          <tr><td style="background:#fafafa;border-top:1px solid #e4e4e7;padding:16px 32px;font-size:12px;color:#71717a">
            Circle HQ Automated Internal Alert · <a href="https://circlehqcompany.com" style="color:#71717a">circlehqcompany.com</a>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>
HTML;

$companyText = "NEW PRODUCT ACCESS REQUEST\n\n"
  . "Product: {$product['name']}\n\n"
  . "LEAD CONTACT INFO:\n"
  . "Name: {$name}\nEmail: {$email}\nPhone: " . ($phone !== '' ? $phone : 'Not provided') . "\n"
  . "Company: " . ($company !== '' ? $company : 'Not provided') . "\n\n"
  . "BUSINESS CONTEXT:\n{$businessContext}\n\n"
  . "Hit Reply to contact {$name} directly.";

$companyPayload = [
  'from' => $fromEmail,
  'to' => [$notificationEmail],
  'reply_to' => $email,
  'subject' => $companySubject,
  'html' => $companyHtml,
  'text' => $companyText,
  'tags' => [
    ['name' => 'email_type', 'value' => 'product_access_company_notification'],
    ['name' => 'product', 'value' => $productId],
  ],
];

$idempotencyKey = 'circle-product-access-' . hash('sha256', $productId . '|' . $email . '|' . floor(time() / 300));
$userResult = send_resend_email($apiKey, $userPayload, $idempotencyKey);
if (!$userResult['success']) {
  error_log('Circle HQ user product access email delivery failed.');
  respond_json(['error' => 'We could not process your request. Please try again.'], 502);
}

// Send distinct company notification email to hello@circlehqcompany.com
send_resend_email($apiKey, $companyPayload);

respond_json([
  'success' => true,
]);
