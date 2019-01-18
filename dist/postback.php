<?php
$action = trim(htmlspecialchars(strip_tags($_GET['action'])));
$aff_campaign = trim(htmlspecialchars(strip_tags($_GET['aff_campaign'])));

if (empty($action) || empty($aff_campaign)) {
	exit('Empty arguments');
}

require_once $_SERVER['DOCUMENT_ROOT'] .'/config.php';
require_once $_SERVER['DOCUMENT_ROOT'] .'/classes/DbConnect.php';

$db = DbConnect::getInstance();
$db = $db->getDb();

$campaign_requets = $db -> prepare('SELECT * FROM postback WHERE aff_campaign=?');
$campaign_requets -> execute(array($aff_campaign));
$campaign_result = $campaign_requets -> fetch(PDO::FETCH_OBJ);

if ($campaign_result) {
	$upd_campaign = $db -> prepare('UPDATE postback SET subscription=?, activated_subscription=? WHERE aff_campaign=?');

	$upd_campaign -> execute(array(
		(($action == 'subscription') ? (++$campaign_result -> subscription) : $campaign_result -> subscription),
		(($action == 'activated_subscription') ? (++$campaign_result -> activated_subscription) : $campaign_result -> activated_subscription),
		$aff_campaign
	));
} else {
	$add_campaign = $db -> prepare('INSERT INTO postback (aff_campaign, subscription, activated_subscription) VALUES (:aff_campaign, :subscription, :activated_subscription)');
	
	$add_campaign->execute(array(
		'aff_campaign' => $aff_campaign,
		'subscription' => ($action == 'subscription') ? 1 : 0,
		'activated_subscription' => ($action == 'activated_subscription') ? 1 : 0
	));
}

?>