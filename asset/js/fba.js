/*********************************************************************
* #### jQuery File Browser Awesome v0.2.0 ####
* Coded by Ican Bachors 2014.
* http://ibacor.com/labs/jquery-file-browser-awesome/
* Updates will be posted to this site.
*********************************************************************/

var fba = function(g) {
    if (g.host != undefined && g.api != undefined && g.host != '' && g.api != '') {
        var j = '<div class="fba_direktori"></div>' + '<div class="fba_read_file"><i class="fa fa-code"></i> <span id="rf"></span></div>' + '<textarea id="fba_text"></textarea>',
            k = getParameterByName('path');
        $("#fba").html(j);
        if (k != '') {
            if (k.indexOf('.') === -1) {
                fba_direktori(k)
            } else {
                var l = k.substring(k.lastIndexOf('/') + 1),
                    gehu = k.replace('/' + l, "");
                fba_direktori(gehu);
                fba_file(k)
            }
        } else {
            fba_direktori("")
        }
        var h = CodeMirror.fromTextArea(document.getElementById("fba_text"), {
            mode: "text/html",
            lineNumbers: true
        })
    } else {
        alert('Options required.')
    }

    function fba_direktori(e) {
        $.ajax({
            type: "POST",
            url: g.host + g.api,
            data: 'path=' + e,
            crossDomain: true,
            dataType: "json"
        }).done(function(c) {
            if (c.status == 'success') {
                var r = "";
                r += '<div class="fba_header"><div>Name</div><div>Size</div><div>Last Modified</div></div>';
                r += '<div class="fba_body">';
                if (e != "") {
                    var d = e.split('/'),
                        ee = [];
                    for (i = 0; i < d.length - 1; i++) {
                        ee.push(d[i])
                    }
                    var f = (d.length > 1 ? ee.join('/') : '');
                    r += '<div class="fba_root"><i class="bsub fa fa-level-up" data-bsub="' + f + '" title="Up"></i> ' + e + unescape('%3C%61%20%68%72%65%66%3D%27%68%74%74%70%73%3A%2F%2F%62%61%63%68%6F%72%73%2E%67%69%74%68%75%62%2E%69%6F%2F%6A%71%75%65%72%79%2D%66%69%6C%65%2D%62%72%6F%77%73%65%72%2D%61%77%65%73%6F%6D%65%2F%27%20%74%69%74%6C%65%3D%27%6A%51%75%65%72%79%20%46%69%6C%65%20%42%72%6F%77%73%65%72%20%41%77%65%73%6F%6D%65%27%20%73%74%79%6C%65%3D%27%66%6C%6F%61%74%3A%72%69%67%68%74%27%20%74%61%72%67%65%74%3D%27%5F%42%4C%41%4E%4B%27%3E%3C%69%20%63%6C%61%73%73%3D%27%66%61%20%66%61%2D%69%6E%66%6F%2D%63%69%72%63%6C%65%27%3E%3C%2F%69%3E%3C%2F%61%3E%3C%2F%64%69%76%3E')
                }
                $.each(c.data, function(i, a) {
                    if (c.data[i].type == "dir") {
                        r += '<div class="fba_content"><div class="name"><span class="sub fa" data-sub="' + c.data[i].path + '"><i class="fa fa-folder"></i> ' + c.data[i].name + '</span></div><div class="size">' + c.data[i].items + ' items</div><div class="modif">' + c.data[i].modif + '</div></div>'
                    } else {
                        var b = fba_size(c.data[i].size);
                        var s = c.data[i].path.substr(c.data[i].path.lastIndexOf(".") + 1);
                        switch (s) {
                            case "html":
                            case "php":
                            case "js":
                            case "css":
                            case "txt":
                            case "md":
                            case "asp":
                            case "aspx":
                            case "jsp":
                            case "py":
                                r += '<div class="fba_content"><div class="name"><span class="rfile fa" data-rfile="' + c.data[i].path + '"><i class="fa fa-file-text-o"></i> ' + c.data[i].name + '</span></div><div class="size">' + b + '</div><div class="modif">' + c.data[i].modif + '</div></div>';
                                break;
                            case "apk":
                                r += '<div class="fba_content"><div class="name"><a href="' + g.host + c.data[i].dir + '/' + c.data[i].path + '" target="_blank"><i class="fa fa-android"></i> ' + c.data[i].name + '</a></div><div class="size">' + b + '</div><div class="modif">' + c.data[i].modif + '</div></div>'
                                break;
                            case "pdf":
                                r += '<div class="fba_content"><div class="name"><a href="' + g.host + c.data[i].dir + '/' + c.data[i].path + '" target="_blank"><i class="fa fa-pdf-o"></i> ' + c.data[i].name + '</a></div><div class="size">' + b + '</div><div class="modif">' + c.data[i].modif + '</div></div>'
                                break;
                            default:
                                r += '<div class="fba_content"><div class="name"><a href="' + g.host + c.data[i].dir + '/' + c.data[i].path + '" target="_blank"><i class="fa fa-cloud-download"></i> ' + c.data[i].name + '</a></div><div class="size">' + b + '</div><div class="modif">' + c.data[i].modif + '</div></div>'
                        }
                    }
                });
                r += "</div>";
                $(".fba_direktori").html(r);
                $(".sub").click(function() {
                    var t = $(this).data("sub");
                    fba_direktori(t);
                    window.history.pushState(null, null, "?path=" + t);
                    return false
                });
                $(".bsub").click(function() {
                    var t = $(this).data("bsub");
                    fba_direktori(t);
                    window.history.pushState(null, null, "?path=" + t);
                    return false
                });
                $(".rfile").click(function() {
                    var a = $(this).data("rfile");
                    fba_file(a);
                    window.history.pushState(null, null, "?path=" + a);
                    return false
                })
            }
        })
    }

    function fba_file(c) {
        $.ajax({
            type: "POST",
            url: g.host + g.api,
            data: 'file=' + c,
            crossDomain: true,
            dataType: "json"
        }).done(function(a) {
            if (a.status == 'success') {
                $("#rf").html(c);
                h.setValue(a.text)
            }
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
