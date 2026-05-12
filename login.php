<?php
session_start();
try {
    $dsn = 'mysql:host=localhost:3306;dbname=form_db;charset=utf8';
    $pdo = new PDO($dsn, 'root', '');
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindValue(':email', $_POST['email']);
    $stmt->execute();
    $user = $stmt->fetch();
    var_dump($user);
    var_dump($_POST['password']);

    if ($user && password_verify($_POST['password'], $user['password'])) {
        session_regenerate_id(true);
        $_SESSION['user_name'] = $user['name'];
        header('Location: index.html');
        exit;
    } else {
        exit('メールアドレスまたはパスワードが違います。');
    }

    } catch (PDOException $e) {
        exit('データベース接続失敗' . $e->getMessage());
    }
    echo password_hash("Videocreate_92", PASSWORD_DEFAULT);
?>