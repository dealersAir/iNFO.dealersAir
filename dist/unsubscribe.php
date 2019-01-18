<?php
$email = trim(htmlspecialchars(strip_tags($_GET['email'])));
$response = '';

if (!empty($email)) {
   require_once $_SERVER['DOCUMENT_ROOT'] .'/config.php';
   require_once $_SERVER['DOCUMENT_ROOT'] .'/classes/DbConnect.php';
   
   $db = DbConnect::getInstance();
   $db = $db -> getDb();
   
   $email = urldecode($email);

   $unsubscr = $db -> prepare('UPDATE subscribers SET subscribe=? WHERE email=?');
   $unsubscr -> execute(array(0, $email));

   $response = 'На ваш email ('. $email .'), больше не будут приходить письма от iNFO.dealersAir (free@info.dealersair.com)';
} else {
   $response = 'Некорректный запрос';
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Отписка от рассылки</title>
</head>
<body>
   <?php echo $response; ?>
</body>
</html>