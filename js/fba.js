/*********************************************************************
* #### jQuery File Browser Awesome v01 ####
* Coded by Ican Bachors 2014.
* http://ibacor.com/labs/jquery-file-browser-awesome/
* Updates will be posted to this site.
*********************************************************************/

// Base_URL scandir.php
var baseurl = 'http://localhost/fba/scandir.php';

// Folder yang akan discan
var browser = 'download';

/* Testing di localhost */
var fix = /\\/;

/* atau jika tombol back bermasalah ketika sudah di hosting gunakan script dibawah ini:
var fix = /\//;
*/

var value = getParameterByName('dir');
if(value != ''){
	if(value.indexOf('.') === -1){
		ibc_fba(baseurl,value,fix,browser);
	}else{
		var valust = value.substring(value.lastIndexOf('/') + 1),
		gehu = value.replace('/'+valust, "");
		ibc_fba(baseurl,gehu,fix,browser);
		ibc_fba_file(baseurl,browser+value);
	}
}else{
	ibc_fba(baseurl,"",fix,browser)
}

function ibc_fba(baseurl,sub,fix,browser) {
	$.ajax( {
		url:baseurl+'?sub='+sub,
		crossDomain:true,
		dataType:"json"
	}).done(function(data) {
		var r="";
		r+="<table>";
		r+='<thead><tr><th class="name">Name</th><th class="size">Size</th><th class="modif">Last Modified</th></tr></thead><tbody>';
		if(data.back!="") {
			r+='<tr><td colspan="3" class="root"><i class="bsub fa fa-reply" data-bsub="'+data.back.replace(fix,"")+'" title="Up"></i> '+data.root+unescape( '%3C%61%20%68%72%65%66%3D%27%68%74%74%70%3A%2F%2F%69%62%61%63%6F%72%2E%63%6F%6D%2F%6C%61%62%73%2F%6A%71%75%65%72%79%2D%66%69%6C%65%2D%62%72%6F%77%73%65%72%2D%61%77%65%73%6F%6D%65%27%20%74%69%74%6C%65%3D%27%6A%51%75%65%72%79%20%46%69%6C%65%20%42%72%6F%77%73%65%72%20%41%77%65%73%6F%6D%65%27%20%73%74%79%6C%65%3D%27%66%6C%6F%61%74%3A%72%69%67%68%74%27%20%74%61%72%67%65%74%3D%27%5F%42%4C%41%4E%4B%27%3E%3C%69%20%63%6C%61%73%73%3D%27%66%61%20%66%61%2D%69%6E%66%6F%2D%63%69%72%63%6C%65%27%3E%3C%2F%69%3E%3C%2F%61%3E%3C%2F%74%64%3E%3C%2F%74%72%3E' )
		}
		$.each(data.items,function(i,item) {
			var size=ibc_ukurana(data.items[i].size);
			if(data.items[i].type=="folder") {
				r+='<tr><td class="name"><span class="sub fa" data-sub="'+data.items[i].path+'"><i class="fa fa-folder"></i> '+data.items[i].name+'</span></td><td class="size">'+data.items[i].items.length+' item</td><td class="modif">'+data.items[i].modif+'</td></tr>';
			} else {
				var s=data.items[i].path.substr(data.items[i].path.lastIndexOf(".")+1);
				switch(s) {
					// List read file. Custom/add example case"asp":case"jsp" etc
					case"html":
					case"php":
					case"js":
					case"css":
					case"txt":
					r+='<tr><td class="name"><span class="rfile fa" data-rfile="'+data.items[i].path+'"><i class="fa fa-file-text-o"></i> '+data.items[i].name+'</span></td><td class="size">'+size+'</td><td class="modif">'+data.items[i].modif+'</td></tr>';
					break;
					// List download file
					default:
					r+='<tr><td class="name"><a href="'+data.items[i].link+data.items[i].path+'" target="_blank"><i class="fa fa-cloud-download"></i> '+data.items[i].name+'</a></td><td class="size">'+size+'</td><td class="modif">'+data.items[i].modif+'</td></tr>';
				}
			}
		});
		r+="</tbody></table>";
		$(".ibc_fba").html(r);
		$(".sub").click(function() {
			var t=$(this).data("sub");
			ibc_fba(baseurl,t,fix,browser);
			window.history.pushState(null, null, "?dir="+t);
			return false
		});
		$(".bsub").click(function() {
			var t=$(this).data("bsub");
			ibc_fba(baseurl,t,fix,browser);
			window.history.pushState(null, null, "?dir="+t);
			return false
		});
		$(".rfile").click(function() {
			var file=$(this).data("rfile");
			ibc_fba_file(baseurl,file);
			window.history.pushState(null, null, "?dir="+file.replace(browser, ""));
			return false
		});
	});
}

function ibc_fba_file(baseurl,file) {
	$.ajax( {
		url:baseurl+'?file='+file,
		crossDomain:true,
		dataType:"json"
	}).done(function(data) {
		editor.setValue(data.text);
	});
}

function ibc_ukurana(e) {
	var t=["Bytes","KB","MB","GB","TB"];
	if(e==0)return"0 Bytes";
	var n=parseInt(Math.floor(Math.log(e)/Math.log(1024)));
	return Math.round(e/Math.pow(1024,n),2)+" "+t[n]
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
