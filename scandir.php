<?php
/*********************************************************************
* #### jQuery File Browser Awesome v01 ####
* Coded by Ican Bachors 2014.
* http://ibacor.com/labs/jquery-file-browser-awesome/
* Updates will be posted to this site.
*********************************************************************/

// Tentukan dulu URL path direktori yang akan di scan. Example: http://ibacor.com/download/file
$path = "http://ibacor.com/download/file";

// Menentukan absolute URL yang menuju ke $path. Output: http://ibacor.com/download/
$link = dirname($path).'/';

// Menentukan direktori yang akan di scan. Output: file
$realpath = explode('/', $path);

if(empty($_GET['sub'])) 
$_GET['sub'] = '';


$dir = $realpath[sizeof($realpath)-1].$_GET['sub'];

// Jalankan fungsi scan
$response = scan($dir,$link);


// Fungsi ini untuk menscan folder secara rekursif, dan membangunnya menjadi array
function scan($dir,$link){

	$files = array();

	// Apakah benar-benar terdapat folder/file?
	if(file_exists($dir)){
	
		foreach(scandir($dir) as $f) {
		
			if(!$f || $f[0] == '.') {
				continue; // Abaikan file tersembunyi
			}

			if(is_dir($dir . '/' . $f)) {

				// List folder
				$files[] = array(
					"name" => $f,
					"type" => "folder",
					"modif" => date('Y-m-d h:i:s',filemtime($dir . '/' . $f)),
					"path" => $_GET['sub'] . '/' . $f,
					"items" => item($dir . '/' . $f) // Menscan lagi isi folder
				);
			}
			
			else {

				// List file
				$files[] = array(
					"name" => $f,
					"type" => "file",
					"link" => $link,
					"path" => $dir . '/' . $f,
					"modif" => date('Y-m-d h:i:s',filemtime($dir . '/' . $f)),
					"size" => filesize($dir . '/' . $f) // Mendapatkan ukuran file
				);
			}
		}
	
	}

	return $files;
}

// funsi ini untuk mendapatkan jumlah item dalam sebuah folder
function item($dir){

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


// Output list direktori & file dalam format JSON
echo json_encode(array(
	"root" => $_GET['sub'],
	"back" => dirname($_GET['sub']),
	"items" => $response
));
