<?php
// Включаем отображение ошибок
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Устанавливаем заголовок ответа
header('Content-Type: application/json');

// Получаем входные данные
$input = json_decode(file_get_contents('php://input'), true);

// Проверка на наличие данных
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Нет данных']);
    exit;
}

// Настройки Telegram
$token = '7633547165:AAGVPFb-kCXLqTpGcdkg4JYMyetpPyd9OGs';
$chat_id = '-4658210216';

// Формируем сообщение
$message = "💬 Новое сообщение:\n\n" .
    "👤 Имя: " . $input['name'] . "\n" .
    "📞 Контакт: " . $input['contact'] . "\n" .
    "📌 Проект: " . $input['project'] . "\n" .
    "💰 Бюджет: " . $input['price'] . "\n" .
    "📨 Способ связи: " . $input['activeType'];

// Настройки cURL
$url = "https://api.telegram.org/bot$token/sendMessage";
$params = [
    'chat_id' => $chat_id,
    'text' => $message,
    'parse_mode' => 'HTML'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$curl_error = curl_error($ch);
curl_close($ch);

// Ответ
if ($response) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Не удалось отправить сообщение', 'curl_error' => $curl_error]);
}
?>
