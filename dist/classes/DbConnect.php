<?php
class DbConnect {
	private $_connection;
	private static $_instance;
	
	public static function getInstance(){
		if(!self::$_instance){
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	private function __construct(){
		$this->_connection = new PDO('mysql:host=localhost;dbname='. DB_NAME, DB_USER, DB_PASSWORD);
		$this->_connection->query('SET NAMES utf8');
	}
	
	private function __clone(){}
		public function getDb(){
			return $this->_connection;
		}
	}
?>