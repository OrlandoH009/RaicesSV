<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Método no permitido']);
    http_response_code(405);
    exit;
}

define('OPENROUTER_API_KEY', 'sk-or-XXXXXXXXXXXXXXXXXXXXXXXX'); // <--KEY AQUI

$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (!$data || !isset($data['messages'])) {
    echo json_encode(['error' => 'Datos inválidos']);
    http_response_code(400);
    exit;
}

$systemPrompt = $data['system'] ?? '';
$messages     = $data['messages'];

$formattedMessages = [];

if (!empty($systemPrompt)) {
    $formattedMessages[] = [
        'role'    => 'system',
        'content' => $systemPrompt
    ];
}

foreach ($messages as $msg) {
    $formattedMessages[] = [
        'role'    => $msg['role'],
        'content' => $msg['content']
    ];
}

$payload = json_encode([
    'model'      => 'meta-llama/llama-3.1-8b-instruct',
    'messages'   => $formattedMessages,
    'max_tokens' => 800,
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

if ($curlError) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL error: ' . $curlError]);
    exit;
}

$responseData = json_decode($response, true);
$text = $responseData['choices'][0]['message']['content']
     ?? 'Lo siento, no pude generar una respuesta.';

http_response_code($httpCode);
echo json_encode([
    'content' => [
        ['type' => 'text', 'text' => $text]
    ]
]);
?>
