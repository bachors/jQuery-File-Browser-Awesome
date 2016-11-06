/*********************************************************************
* #### jQuery File Browser Awesome v0.0.2 ####
* Coded by Ican Bachors 2014.
* http://ibacor.com/labs/jquery-file-browser-awesome/
* Updates will be posted to this site.
*********************************************************************/

var fba = function(g) {

	/* Testing di localhost */
    var h = /\\/;

	/* atau jika tombol back bermasalah ketika sudah di hosting gunakan script dibawah ini:
	var h = /\//;
	*/
	
    var j = '<div class="fba_direktori"></div>' + '<div class="fba_read_file">File</div>' + '<textarea id="fba_text"></textarea>',
        k = getParameterByName('dir');

    $("#fba").html(j);
    if (k != '') {
        if (k.indexOf('.') === -1) {
            fba_direktori(g, k, h)
        } else {
            var l = k.substring(k.lastIndexOf('/') + 1),
                gehu = k.replace('/' + l, "");
            fba_direktori(g, gehu, h);
            fba_file(g, k)
        }
    } else {
        fba_direktori(g, "", h)
    }

    function fba_direktori(d, e, f) {
        $.ajax({
            type: "POST",
            url: d,
            data: 'sub=' + e,
            crossDomain: true,
            dataType: "json"
        }).done(function(c) {
            var r = "";
            r += '<div class="fba_header"><div>Name</div><div>Size</div><div>Last Modified</div></div>';
            r += '<div class="fba_body">';
            if (c.back != "") {
                r += '<div class="fba_root"><i class="bsub fa fa-reply" data-bsub="' + c.back.replace(f, "") + '" title="Up"></i> ' + c.root + unescape( '%3C%61%20%68%72%65%66%3D%27%68%74%74%70%3A%2F%2F%69%62%61%63%6F%72%2E%63%6F%6D%2F%6C%61%62%73%2F%6A%71%75%65%72%79%2D%66%69%6C%65%2D%62%72%6F%77%73%65%72%2D%61%77%65%73%6F%6D%65%27%20%74%69%74%6C%65%3D%27%6A%51%75%65%72%79%20%46%69%6C%65%20%42%72%6F%77%73%65%72%20%41%77%65%73%6F%6D%65%27%20%73%74%79%6C%65%3D%27%66%6C%6F%61%74%3A%72%69%67%68%74%27%20%74%61%72%67%65%74%3D%27%5F%42%4C%41%4E%4B%27%3E%3C%69%20%63%6C%61%73%73%3D%27%66%61%20%66%61%2D%69%6E%66%6F%2D%63%69%72%63%6C%65%27%3E%3C%2F%69%3E%3C%2F%61%3E%3C%2F%64%69%76%3E' )
            }
            $.each(c.items, function(i, a) {
                var b = fba_size(c.items[i].size);
                if (c.items[i].type == "folder") {
                    r += '<div class="fba_content"><div class="name"><span class="sub fa" data-sub="' + c.items[i].path + '"><i class="fa fa-folder"></i> ' + c.items[i].name + '</span></div><div class="size">' + c.items[i].items.length + ' item</div><div class="modif">' + c.items[i].modif + '</div></div>'
                } else {
                    var s = c.items[i].path.substr(c.items[i].path.lastIndexOf(".") + 1);
                    switch (s) {
						
						// List read file. Custom/add example case"asp":case"jsp" etc
                        case "html":
                        case "php":
                        case "js":
                        case "css":
                        case "txt":
                            r += '<div class="fba_content"><div class="name"><span class="rfile fa" data-rfile="' + c.items[i].path + '"><i class="fa fa-file-text-o"></i> ' + c.items[i].name + '</span></div><div class="size">' + b + '</div><div class="modif">' + c.items[i].modif + '</div></div>';
                            break;
							
						// List download file
                        default:
                            r += '<div class="fba_content"><div class="name"><a href="' + c.items[i].link + c.items[i].path + '" target="_blank"><i class="fa fa-cloud-download"></i> ' + c.items[i].name + '</a></div><div class="size">' + b + '</div><div class="modif">' + c.items[i].modif + '</div></div>'
                    }
                }
            });
            r += "</div>";
            $(".fba_direktori").html(r);
            $(".sub").click(function() {
                var t = $(this).data("sub");
                fba_direktori(d, t, f);
                window.history.pushState(null, null, "?dir=" + t);
                return false
            });
            $(".bsub").click(function() {
                var t = $(this).data("bsub");
                fba_direktori(d, t, f);
                window.history.pushState(null, null, "?dir=" + t);
                return false
            });
            $(".rfile").click(function() {
                var a = $(this).data("rfile");
                fba_file(d, a);
                window.history.pushState(null, null, "?dir=" + a);
                return false
            })
        })
    }

    function fba_file(b, c) {
        $.ajax({
            type: "POST",
            url: b,
            data: 'file=' + c,
            crossDomain: true,
            dataType: "json"
        }).done(function(a) {
            $(".fba_read_file").html(c);
            editor.setValue(a.text)
        })
    }

    function fba_size(e) {
        var t = ["Bytes", "KB", "MB", "GB", "TB"];
        if (e == 0) return "0 Bytes";
        var n = parseInt(Math.floor(Math.log(e) / Math.log(1024)));
        return Math.round(e / Math.pow(1024, n), 2) + " " + t[n]
    }

    function getParameterByName(a) {
        a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var b = new RegExp("[\\?&]" + a + "=([^&#]*)"),
            results = b.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
    }

}
