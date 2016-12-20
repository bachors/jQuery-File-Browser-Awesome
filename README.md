jQuery-File-Browser-Awesome
===========================
<p>Today we want to share a cool experiment with you. It is a file browser awesome, which you can upload to a folder somewhere on your site and share documents, pictures and other files with the world. The app is built with PHP, jQuery, fontawesome and uses CSS3.</p>

<h2>USAGE:</h2>
<h3>CSS</h3>
<pre>
&lt;!-- Include Font Awesome --&gt;
&lt;link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"&gt;
        
&lt;!-- Codemirror --&gt;
&lt;link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/codemirror.min.css"&gt;
&lt;link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/addon/dialog/dialog.min.css"&gt;
        
&lt;!-- Custom Style --&gt;
&lt;link type="text/css" rel="stylesheet" href="asset/css/fba.css" /&gt;
</pre>
<h3>HTML</h3>
<pre>
&lt;div id="fba"&gt;&lt;/div&gt;
</pre>
<h3>JS</h3>
<pre>
&lt;!-- Codemirror --&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/codemirror.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/mode/xml/xml.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/mode/javascript/javascript.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/mode/css/css.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/mode/htmlmixed/htmlmixed.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/addon/dialog/dialog.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/addon/search/searchcursor.min.js"&gt;&lt;/script&gt;
&lt;script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/4.3.0/addon/search/search.min.js"&gt;&lt;/script&gt;
        
&lt;!-- Include jQuery --&gt;
&lt;script src="//code.jquery.com/jquery-2.1.1.min.js"&gt;&lt;/script&gt;
        
&lt;!-- Include fba.js --&gt;
&lt;script src="asset/js/fba.js"&gt;&lt;/script&gt;
</pre>
<br>
<h2>CONFIG:</h2>
<h3>1. fba_api.php</h3>
<pre>
// Include class fba.php
include_once('lib/fba.php');

$dir = 'dir1/dir2'; // nama folder yang akan di scan.

$fba =  new fba($dir);
</pre>

<h3>2. Javascript code in your HTML page.</h3>
<pre>
fba({
   host: 'http://your-domain.com/', // your host / domain
   api: 'fba_api.php' // file name fba api
});
</pre>

<h1><a href="http://ibacor.com/file" target="_blank">DEMO</a></h1>
