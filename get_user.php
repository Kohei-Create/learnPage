<?php
session_start([
    'cookie_httponly' => true,
    'cookie_secure' => false,
    'cookie_samesite' => 'Lax',
]);
header('Cache-Control; no-store, no-cache, must-revalidate, max-age=0');
header('Content-type: application/json');

$isLoggedIn = isset($_SESSION['user_name']);
$userName = '';

if ($isLoggedIn) {
    $userName = htmlspecialchars($_SESSION['user_name'], ENT_QUOTES, 'UTF-8');
}

$response = [
    'isLoggedIn' => $isLoggedIn,
    'name' => $userName
];

echo json_encode($response);
exit;
?>