<?php

/*********************************************************************
* #### jQuery File Browser Awesome v0.2.0 ####
* Coded by Ican Bachors 2014.
* http://ibacor.com/labs/jquery-file-browser-awesome/
* Updates will be posted to this site.
*********************************************************************/

class Fba {
	
	function __construct($path)
    {
		$this->path = $path;
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

	// Fungsi ini untuk melihat isi folder
	public function scan($path = ''){

		$files = array();
		
		if(preg_match('/\.\./', $path)){
			
			$path = '';

		}
			
		$files['status'] = 'success';
		
		$browser = (empty($path) ? $this->path : $this->path . '/' .$path);

		// Apakah benar-benar terdapat folder/file?
		if(file_exists($browser)){
				
			$files['status'] = 'success';
			
			foreach(scandir($browser) as $f) {
				
				if(!$f || $f[0] == '.') {
					continue; // Abaikan file tersembunyi
				}

				if(is_dir($browser . '/' . $f)) {

					// List folder
					$files['data'][] = array(
						"name" => $f,
						"type" => "dir",
						"modif" => date('Y-m-d h:i:s',filemtime($browser . '/' . $f)),
						"path" => (empty($path) ? $f : $path . '/' .$f),
						"items" => count($this->item($browser . '/' . $f)) // Menscan lagi isi folder
					);
				}
					
				else {

					// List file
					$files['data'][] = array(
						"name" => $f,
						"type" => "file",
						"path" => (empty($path) ? $f : $path . '/' .$f),
						"modif" => date('Y-m-d h:i:s',filemtime($browser . '/' . $f)),
						"size" => filesize($browser . '/' . $f) // Mendapatkan ukuran file
					);
				}
			}
			
		}else{
			$files['status'] = 'error';
		}

		return $files;
	}

	// funsi ini untuk melihat isi file
	public function read($file){
		
		if(preg_match('/\.\./', $file)){
			
			return array('status' => 'error');

		}else{
		
			$browser = (empty($file) ? $this->path : $this->path . '/' .$file);

			$text = file_get_contents($browser);

			return array('status' => 'success', 'text' => $text);
		
		}
	}

}
