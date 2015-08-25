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
		ibc_fba(baseurl,sub=value,fix,browser);
	}else{
		var valust = value.substring(value.lastIndexOf('/') + 1),
		gehu = value.replace('/'+valust, "");
		ibc_fba(baseurl,sub=gehu,fix,browser);
		ibc_fba_file(baseurl,browser+value);
	}
}else{
	ibc_fba(baseurl,sub="",fix,browser)
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
			r+='<tr><td colspan="3" class="root"><i class="bsub fa fa-reply" data-bsub="'+data.back.replace(fix,"")+'" title="Up"></i> '+data.root+"<a href='http://ibacor.com/labs/jquery-file-browser-awesome' title='jQuery File Browser Awesome' style='float:right' target='_BLANK'><i class='fa fa-info-circle'></i></a></td></tr>"
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
