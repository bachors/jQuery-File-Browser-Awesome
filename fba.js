/*********************************************************************
* #### jQuery File Browser Awesome v01 ####
* Coded by Ican Bachors 2014.
* http://ibacor.com/labs/jquery-file-browser-awesome/
* Updates will be posted to this site.
*********************************************************************/

/* Setting URL path scandir.php */
var scan = 'http://domain.com/scandir.php';
/****************************/

function ibc_fba(e,t){$.ajax({url:e+"?sub="+t,crossDomain:true,dataType:"json"}).done(function(t){var n="";n+="<table>";n+='<thead><tr><th class="name">Name</th><th class="size">Size</th><th class="modif">Last Modified</th></tr></thead><tbody>';if(t.back!=""){n+='<tr><td colspan="3" class="root"><i class="bsub fa fa-reply" data-bsub="'+t.back.replace(/\\/,"")+'"></i> '+t.root+"</td></tr>"}$.each(t.items,function(e,r){var i=ibc_ukurana(t.items[e].size);if(t.items[e].type=="folder"){n+='<tr><td class="name"><span class="sub fa" data-sub="'+t.items[e].path+'"><i class="fa fa-folder"></i> '+t.items[e].name+'</span></td><td class="size">'+t.items[e].items.length+' item</td><td class="modif">'+t.items[e].modif+"</td></tr>"}else{n+='<tr><td class="name"><a href="'+t.items[e].link+t.items[e].path+'" target="_blank"><i class="fa fa-file"></i> '+t.items[e].name+'</a></td><td class="size">'+i+'</td><td class="modif">'+t.items[e].modif+"</td></tr>"}});n+="</tbody></table>";$(".ibc_fba").html(n);$(".sub").click(function(){var t=$(this).data("sub");ibc_fba(e,t);return false});$(".bsub").click(function(){var t=$(this).data("bsub");ibc_fba(e,t);return false})})}function ibc_ukurana(e){var t=["Bytes","KB","MB","GB","TB"];if(e==0)return"0 Bytes";var n=parseInt(Math.floor(Math.log(e)/Math.log(1024)));return Math.round(e/Math.pow(1024,n),2)+" "+t[n]}ibc_fba(scan,sub="")
