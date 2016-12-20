<?php

header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: http://your-domain.com');

// Include class fba.php
include_once('lib/fba.php');

$dir = 'files'; // nama folder yang akan di scan. dir1/dir2

$fba =  new fba($dir);

// Scan direktori
if(isset($_POST['path'])){

	// Jalankan fungsi scan->('SUB DIR NAME')
	$res = $fba->scan($_POST['path']);
	
	// Output list direktori & file dalam format JSON
	echo json_encode($res);
	
}

// Read file
else if(!empty($_POST['file'])){

	// Jalankan fungsi scan->('SUB DIR NAME')
	$res = $fba->read($_POST['file']);
	
	// Output isi file
	echo json_encode($res);

}
