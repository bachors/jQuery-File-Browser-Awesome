<?php

// Tentukan dulu base url sobat. Contoh http://ibacor.com/
$baseurl = "http://your-hostname.com/";

// Tentuka nama folder/direktori yang akan ditampilkan. Contoh folder1/folder2
$browser = "files";

// Include class fba.php
include_once('lib/fba.php');

// Scan direktori
if(isset($_POST['sub'])){

	$sub = (empty($_POST['sub']) ? '' : $_POST['sub']);

	// Create new object
	$fba =  new fba($baseurl, $browser, $sub);

	// Jalankan fungsi scan
	$response = $fba->scan();
	
	// Output list direktori & file dalam format JSON
	echo json_encode(array(
		"root" => $fba->sub,
		"back" => dirname($fba->sub),
		"items" => $response
	));
	
}

// Read file
else if(!empty($_POST['file'])){

	// Create new object
	$fba =  new fba($baseurl, $browser, '');
	
	$sub = $_POST['file'];

	$text = file_get_contents($fba->browser.$sub);
	
	echo json_encode(array(
		"text" => $text
	));

}

// 404
else{
	header('Location: '.$baseurl);
}