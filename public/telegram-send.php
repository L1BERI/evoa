<?php
// Настройки
$token = '7633547165:AAGVPFb-kCXLqTpGcdkg4JYMyetpPyd9OGs';
$chat_id = '-4658210216';


$data = json_decode(file_get_contents('php://input'), true);


if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !$data) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Метод должен быть POST']);
    exit;
}

// Формируем сообщение
$message = "📝 Новая заявка с сайта:\n";
$message .= "Имя: " . ($data['name'] ?? '—') . "\n";
$message .= "Контакт: " . ($data['contact'] ?? '—') . "\n";
$message .= "Тип: " . ($data['activeType'] ?? '—') . "\n";
$message .= "Проект: " . ($data['project'] ?? '—') . "\n";
$message .= "Бюджет: " . ($data['price'] ?? '—');


$url = "https://api.telegram.org/bot{$token}/sendMessage";

$response = file_get_contents($url . '?' . http_build_query([
    'chat_id' => $chat_id,
    'text' => $message,
    'parse_mode' => 'HTML'
]));

// Ответ клиенту
echo json_encode(['status' => 'success', 'message' => 'Отправлено!']);
?>