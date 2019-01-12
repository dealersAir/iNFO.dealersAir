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

// new sitemap
$conf = array(
	'base' => 'https://'. $_SERVER['HTTP_HOST'],
	'excl' => array('css', 'html')
);

$smap = new SitemapXML($conf);
$sitemap_xml = $smap -> getSitemapXml();

$sm_file = fopen($_SERVER['DOCUMENT_ROOT'] .'/sitemap.xml', 'w');
fwrite($sm_file, $sitemap_xml);
fclose($sm_file);

header('Content-type: text/xml');
echo $sitemap_xml;
?>