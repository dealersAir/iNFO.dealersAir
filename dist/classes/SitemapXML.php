<?php
class SitemapXML extends Core {
	private $_xml;
	
	protected function run() {
		$this -> createSitemap();
	}
	
	private function fetchContent() {
		$cont = $this -> _db -> prepare('SELECT * FROM coding_content');
		$cont -> execute();
		return $cont -> fetchAll(PDO::FETCH_OBJ);
	}
	
	public function createSitemap() {
		$this -> _xml = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8" ?>'."\n".'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" />');
		
		$content = $this -> fetchContent();
		
		// home page
		$url = $this -> _xml -> addChild('url');
		$url -> addChild('loc', $this -> _opt['base'] .'/');
		$url -> addChild('lastmod', '2019-01-02');
		$url -> addChild('changefreq', 'always');
		
		// pages
		foreach ($content as $val) {
			if (!in_array($val -> url, $this -> _opt['excl'])) {
				$url = $this -> _xml -> addChild('url');
				$url -> addChild('loc', $this -> _opt['base'] .'/'. $val -> url);
				$url -> addChild('lastmod', explode(' ', $val -> modified)[0]);
				$url -> addChild('changefreq', 'always');
			}
		}
	}
	
	public function getSitemapXml() {
		return $this -> _xml -> asXML();
	}
}
?>