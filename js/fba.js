/*********************************************************************
* #### jQuery File Browser Awesome v01 ####
* Coded by Ican Bachors 2014.
* http://ibacor.com/labs/jquery-file-browser-awesome/
* Updates will be posted to this site.
*********************************************************************/

/* Testing di localhost */
var fix = /\\/;

/* atau jika tombol back bermasalah ketika sudah di hosting gunakan script dibawah ini:
var fix = /\//;
*/

ibc_fba(sub="",fix)

function ibc_fba_file(e) {
	$.ajax( {
		// Setting URL scandir.php
		url:"http://localhost/fba/scandir.php?file="+e,crossDomain:true,dataType:"json"
	}
	).done(function(e) {
		var t='<div class="pan_code"><i class="fa fa-code pull-left"></i> <strong>Ctrl-F / Cmd-F:</strong> Start searching, <strong>Ctrl-G / Cmd-G:</strong> Find next, <strong>Shift-Ctrl-G / Shift-Cmd-G:</strong> Find previous, <strong>Shift-Ctrl-F / Cmd-Option-F:</strong> Replace, <strong>Shift-Ctrl-R / Shift-Cmd-Option-F:</strong> Replace all</div><textarea id="text" name="text">'+e.text+'</textarea><script>var editor = CodeMirror.fromTextArea(document.getElementById("text"), {	mode: "text/html", lineNumbers: true, theme: "monokai"});</script>';
		$("#ibc_fba_file").html(t)
	}
	)
}

function ibc_fba(t,n) {
	$.ajax( {
		// Setting URL scandir.php
		url:"http://localhost/fba/scandir.php?sub="+t,crossDomain:true,dataType:"json"
	}
	).done(function(t) {
		var r="";
		r+="<table>";
		r+='<thead><tr><th class="name">Name</th><th class="size">Size</th><th class="modif">Last Modified</th></tr></thead><tbody>';
		if(t.back!="") {
			r+='<tr><td colspan="3" class="root"><i class="bsub fa fa-reply" data-bsub="'+t.back.replace(n,"")+'"></i> '+t.root+"</td></tr>"
		}
		$.each(t.items,function(e,n) {
			var i=ibc_ukurana(t.items[e].size);
			if(t.items[e].type=="folder") {
				r+='<tr><td class="name"><span class="sub fa" data-sub="'+t.items[e].path+'"><i class="fa fa-folder"></i> '+t.items[e].name+'</span></td><td class="size">'+t.items[e].items.length+' item</td><td class="modif">'+t.items[e].modif+"</td></tr>"
			} else {
				var s=t.items[e].path.substr(t.items[e].path.lastIndexOf(".")+1);
				switch(s) {
					// List read file. Custom/add example case"asp":case"jsp"
					case"html":case"php":case"js":case"css":case"txt":r+='<tr><td class="name"><span class="rfile fa" data-rfile="'+t.items[e].path+'"><i class="fa fa-file-text"></i> '+t.items[e].name+'</span></td><td class="size">'+i+'</td><td class="modif">'+t.items[e].modif+"</td></tr>";
					break;
					// List download file
					default:r+='<tr><td class="name"><a href="'+t.items[e].link+t.items[e].path+'" target="_blank"><i class="fa fa-archive"></i> '+t.items[e].name+'</a></td><td class="size">'+i+'</td><td class="modif">'+t.items[e].modif+"</td></tr>"
				}
			}
		}
		);
		r+='<tr><td colspan="3" style="text-align:center;font-size:8px;padding-top:30px">'+unescape("%3C%61%20%68%72%65%66%3D%22%68%74%74%70%3A%2F%2F%69%62%61%63%6F%72%2E%63%6F%6D%2F%6C%61%62%73%2F%6A%71%75%65%72%79%2D%66%69%6C%65%2D%62%72%6F%77%73%65%72%2D%61%77%65%73%6F%6D%65%2F%22%20%74%61%72%67%65%74%3D%22%5F%42%4C%41%4E%4B%22%3E%46%69%6C%65%20%42%72%6F%77%73%65%72%20%41%77%65%73%6F%6D%65%3C%2F%61%3E")+"</td></tr>";
		r+="</tbody></table>";
		$(".ibc_fba").html(r);
		$("#ibc_fba_file").html('');
		$(".sub").click(function() {
			var t=$(this).data("sub");
			ibc_fba(t,n);
			return false
		}
		);
		$(".bsub").click(function() {
			var t=$(this).data("bsub");
			ibc_fba(t,n);
			return false
		}
		);
		$(".rfile").click(function() {
			var e=$(this).data("rfile");
			ibc_fba_file(e);
			return false
		}
		)
	}
	)
}

function ibc_ukurana(e) {
	var t=["Bytes","KB","MB","GB","TB"];
	if(e==0)return"0 Bytes";
	var n=parseInt(Math.floor(Math.log(e)/Math.log(1024)));
	return Math.round(e/Math.pow(1024,n),2)+" "+t[n]
}