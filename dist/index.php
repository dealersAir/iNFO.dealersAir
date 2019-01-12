<?php
error_reporting(E_ALL ^ E_NOTICE);
ini_set('display_errors', 1);

require_once $_SERVER['DOCUMENT_ROOT'] .'/config.php';

// load classes
function loadClasses($class_name) {
	if (file_exists($_SERVER['DOCUMENT_ROOT'] .'/classes/'. $class_name .'.php')) {
		require_once $_SERVER['DOCUMENT_ROOT'] .'/classes/'. $class_name .'.php';
	}
}

spl_autoload_register('loadClasses');

// get content
if (!empty($_GET['route'])) {
	$url = trim(htmlspecialchars(strip_tags($_GET['route'])));

	$main = new Main(array('url' => $url));
	$content = $main -> getContent();

	if (!empty($content)) {
		require $_SERVER['DOCUMENT_ROOT'] .'/templates/'. $content -> type .'.php';
	} else {
		require $_SERVER['DOCUMENT_ROOT'] .'/templates/404.php';
	}
} else {
	// $home = new Home();
	
	require $_SERVER['DOCUMENT_ROOT'] .'/templates/home.php';
}
?>