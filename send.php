<?php
if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['email'])) {$email = $_POST['email'];}
if (isset($_POST['message'])) {$message = $_POST['message'];}

$address = 'ealexsee@gmail.com';
$sub = "Сообщение из сайта test.com";
$mes = "Автор назвался: $name \nУказал свой адрес: $email \nСодержание письма: $message";
$verify = mail($address, $sub, $mes, "Content-type:text/plain; charset = windows-1251\r\nFrom: $email");

$message = array();

if ($verify) {
    $message['title'] = 'status verify';
    $message['message'] = 'message was sent successfully';

} else {
    $message['title'] = 'status no verify';
    $message['message'] = 'the message was not sent';
}

exit(json_encode($message));
