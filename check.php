<?php
session_start();
echo '君の名は...' .$_SESSION['user_name']. '様ですか？';
?>