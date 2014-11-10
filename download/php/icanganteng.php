<?php
	if(!empty($_GET['sub'])) {
		$json_url = 'http://www.mangaeden.com/api/'.$_GET['sub'];
		$json = file_get_contents($json_url);
		$hasil = json_decode($json);
		if(preg_match("/manga/",$_GET['sub'])){
			foreach($hasil->chapters as $key => $value)
			{
				$hasil->chapters[$key][1] = date('Y-m-d',$hasil->chapters[$key][1]);
			}
		}
		$arr = array($hasil);
		echo json_encode($arr);
	}
?>