<?php
class Main extends Core {
	private $_content;
	private $_posts;
	
	protected function run() {
		$this->fetchContent();
		
		if ($this->_content->type == 'category') {
			$this->fetchPosts();
		}
	}
	
	private function fetchContent() {
		$cont = $this->_db->prepare('SELECT * FROM coding_content WHERE url=?');
		$cont->execute(array($this->_opt['url']));
		$this->_content = $cont->fetch(PDO::FETCH_OBJ);
	}
	
	private function fetchPosts() {
		$posts = $this->_db->prepare('SELECT * FROM coding_content WHERE relationship=?');
		$posts->execute(array($this->_content->id));
		$this->_posts = $posts->fetchAll(PDO::FETCH_OBJ);
	}
	
	public function getContent() {
		return $this->_content;
	}
	
	public function getPosts() {
		return $this->_posts;
	}
}
?>