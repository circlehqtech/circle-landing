<?php

// Copy this file one level above public_html and rename it to:
// circle-email-config.php
// Never commit or place the completed file inside a publicly accessible folder.
return [
    'RESEND_API_KEY' => 're_replace_with_your_key',
    'RESEND_FROM_EMAIL' => 'Circle HQ <readiness@circlehqcompany.com>',
    'READINESS_NOTIFICATION_EMAIL' => 'hello@circlehqcompany.com',
    'ALLOWED_ORIGINS' => [
        'https://circlehqcompany.com',
        'https://www.circlehqcompany.com',
    ],
];
