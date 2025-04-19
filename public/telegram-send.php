<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['error' => 'No data received']);
    http_response_code(400);
    exit;
}


$token = '7633547165:AAGVPFb-kCXLqTpGcdkg4JYMyetpPyd9OGs';
$chat_id = '-4658210216';

$message = "💬 Новое сообщение:\n\n" .
    "👤 Имя: " . $input['name'] . "\n" .
    "📞 Контакт: " . $input['contact'] . "\n" .
    "📌 Проект: " . $input['project'] . "\n" .
    "💰 Бюджет: " . $input['price'] . "\n" .
    "📨 Способ связи: " . $input['activeType'];

$url = "https://api.telegram.org/bot$token/sendMessage";

$params = [
    'chat_id' => $chat_id,
    'text' => $message,
    'parse_mode' => 'HTML'
];

$options = [
    'http' => [
        'method'  => 'POST',
        'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query($params)
    ]
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Message not sent']);
    http_response_code(500);
}
?>
