<?php

/*********************************************************************
* #### jQuery File Browser Awesome v0.0.2 ####
* Coded by Ican Bachors 2014.
* http://ibacor.com/labs/jquery-file-browser-awesome/
* Updates will be posted to this site.
*********************************************************************/

class Fba {
	
	private $baseurl;
	public $browser;	
	public $sub;
	
	function __construct($baseurl, $browser, $sub)
    {
		// Full path direktori
		$path = $baseurl.$browser;
		
		// Menentukan absolute URL yang menuju ke $path. Output: http://ibacor.com/download/
		$this->linkpath = dirname($path).'/';
		
		$direk = str_replace($baseurl, '', $this->linkpath);

		// Menentukan direktori yang akan di scan. Output: file
		$realpath = explode('/', $path);
		$this->dirpath = $direk.$realpath[sizeof($realpath)-1].$sub;
		
		$this->browser = $browser;
		
		$this->sub = $sub;
    }

	// funsi ini untuk mendapatkan jumlah item dalam sebuah folder
	private function item($dir){

		foreach(scandir($dir) as $f) {		
			if(!$f || $f[0] == '.') {
				continue; // Abaikan file tersembunyi
			}
			$files[] = array(
				"name" => $f
			);
		}

		return $files;
	}

	// Fungsi ini untuk menscan folder secara rekursif, dan membangunnya menjadi array
	public function scan(){

		$files = array();

		// Apakah benar-benar terdapat folder/file?
		if(file_exists($this->dirpath)){
		
			foreach(scandir($this->dirpath) as $f) {
			
				if(!$f || $f[0] == '.') {
					continue; // Abaikan file tersembunyi
				}

				if(is_dir($this->dirpath . '/' . $f)) {

					// List folder
					$files[] = array(
						"name" => $f,
						"type" => "folder",
						"modif" => date('Y-m-d h:i:s',filemtime($this->dirpath . '/' . $f)),
						"path" => str_replace($this->browser, '', $this->sub . '/' . $f),
						"items" => $this->item($this->dirpath . '/' . $f) // Menscan lagi isi folder
					);
				}
				
				else {

					// List file
					$files[] = array(
						"name" => $f,
						"type" => "file",
						"link" => $this->linkpath,
						"path" => str_replace($this->browser, '', $this->dirpath . '/' . $f),
						"modif" => date('Y-m-d h:i:s',filemtime($this->dirpath . '/' . $f)),
						"size" => filesize($this->dirpath . '/' . $f) // Mendapatkan ukuran file
					);
				}
			}
		
		}

		return $files;
	}

}
