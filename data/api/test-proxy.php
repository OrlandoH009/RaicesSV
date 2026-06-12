<?php
header('Content-Type: application/json');

if (!function_exists('curl_init')) {
    echo json_encode(['error' => 'cURL NO está activado en PHP. Actívalo en WAMP.']);
    exit;
}

define('OPENROUTER_API_KEY', 'sk-or-XXXXXXXXXXXXXXXXXXXXXXXX'); // <-- TU KEY AQUI

$payload = json_encode([
    'model'    => 'meta-llama/llama-3.1-8b-instruct',
    'messages' => [
        ['role' => 'system', 'content' => 'Eres un asistente de prueba.'],
        ['role' => 'user',   'content' => 'Responde solo: Conexión exitosa']
    ],
    'max_tokens' => 50,
]);

$ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . OPENROUTER_API_KEY,
        'HTTP-Referer: http://localhost/RaicesSV',
        'X-Title: Raices SV'
    ],
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_SSL_VERIFYPEER => false,
]);

$response  = curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

echo json_encode([
    'curl_ok'    => true,
    'http_code'  => $httpCode,
    'curl_error' => $curlError ?: null,
    'respuesta'  => json_decode($response, true)['choices'][0]['message']['content'] ?? null,
    'raw'        => json_decode($response, true)
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
