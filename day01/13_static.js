var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(req, res){
    var pathname = url.parse(req.url).pathname;
    if(pathname == "/"){
        pathname = "index.html";
    }
    var extname = path.extname(pathname);

    fs.readFile('../../../work/'+pathname, function(err, data){
        if(err){
            fs.readFile('./')
        }
    });
}).listen(3000,'127.0.0.1');
