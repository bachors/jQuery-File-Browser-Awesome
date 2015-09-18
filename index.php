<!DOCTYPE html>
<html>
	<head>

		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<title>jQuery File Browser Awesome - iBacor.com</title>
		
		<!-- Include Font Awesome -->
		<link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
		
		<!-- Include jQuery -->
		<script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
		
		<!-- Include fba.js -->
		<script src="js/fba.js"></script>
		
		<!-- Custom Style -->
		<link type="text/css" rel="stylesheet" href="css/fba.css" />
		
		<!-- Include libraries codemirror -->
		<script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/codemirror.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/mode/xml/xml.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/mode/javascript/javascript.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/mode/css/css.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/mode/htmlmixed/htmlmixed.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/addon/dialog/dialog.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/addon/search/searchcursor.min.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/addon/search/search.min.js"></script>
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/codemirror.min.css">
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/addon/dialog/dialog.min.css">
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/theme/monokai.min.css">

	</head>
	<body>
		<div id="fb-root"></div>
		<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));</script>

		<div id="ibc_konten">
		
			<center><div class="fb-like" data-href="http://ibacor.com/premium/file/" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div></center><br>

			<!-- Display File Browser Awesome -->
			<div class="ibc_fba"></div>
			
			<!-- Read File -->
			<div id="ibc_fba_file">
				<div class="pan_code"><i class="fa fa-code pull-left"></i> <strong>Ctrl-F / Cmd-F:</strong> Start searching, <strong>Ctrl-G / Cmd-G:</strong> Find next, <strong>Shift-Ctrl-G / Shift-Cmd-G:</strong> Find previous, <strong>Shift-Ctrl-F / Cmd-Option-F:</strong> Replace, <strong>Shift-Ctrl-R / Shift-Cmd-Option-F:</strong> Replace all</div>
				<textarea id="ibc_text">
 _____                ____    ______            _____     ____  
 \__  \   __  _  __  / __ \  /  ___/   ____    /     \   / __ \ 
  > __ \_ \ \/ \/ / \  ___/  \___ \   /  _ \  \  Y Y  \ \  ___/ 
 (____  /  \     /   \___  > ____  > (  <_> ) /__|_|  /  \___  >
      \/    \/\_/        \/      \/   \____/        \/       \/ 

				</textarea>
			</div>
		</div>

		<a href="https://github.com/bachors/jQuery-File-Browser-Awesome" target="_BLANK"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"></a>

		<script>var editor = CodeMirror.fromTextArea(document.getElementById("ibc_text"), {	mode: "text/html", lineNumbers: true, theme: "monokai"});</script>
		
	</body>
</html>
