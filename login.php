<?php
$email = $_POST['email'];
$password = $_POST['password'];

session_start();
$email = $_POST['email'];
$password = $_POST['password'];

$correct_hash = '$2y$10$7R6v7S1C1A5p7P8v9Q0r1S2t3U4v5W6x7Y8z9A0b1C2d3E4f5G6h';
$correct_email = 'was914hs@gmail.com';

if ($email === $correct_email && password_verify($password, $correct_hash)) {
    session_regenerate_id(true);
    $_SESSION['user_name'] = 'was914hs';
    header('Location: index.html');
    exit;
    } else {
        header('Location: form.html?error=1');
        exit;
    }
    ?>