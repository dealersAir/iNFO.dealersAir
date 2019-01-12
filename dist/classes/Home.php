<?php
class Home extends Core {
	private $_all_categories;
	private $_all_posts;
	
	protected function run() {
		$this->fetchAll();
	}
	
	private function fetchAll() {
		$all = $this->_db->prepare('SELECT * FROM coding_content');
		$all->execute();
		$all = $all->fetchAll(PDO::FETCH_OBJ);

		$this->_all_categories = $this->_all_posts =  array();
		
		foreach ($all as $key => $val) {
			if ($val->type == 'category') {
				$this->_all_categories[] = $val;
				
				$this->_all_posts[$val->id] = array();
			} else if ($val->type == 'post') {
				$this->_all_posts[$val->relationship][] = $val;
			}
		}
	}

	public function getAllCategories() {
		return $this->_all_categories;
	}
	
	public function getPosts($cat_id) {
		return $this->_all_posts[$cat_id];
	}
}
?>