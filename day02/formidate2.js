var http = require('http');
var fs = require('fs');
var formiable = require('formidable');
var sd = require('silly-datetime');
var path = require('path');

var server = http.createServer(function (req, res) {
    if (req.url == "/dopost" && req.method.toLocaleLowerCase() == 'post'){
        var form = new formiable.IncomingForm();
        form.uploadDir = './upload';
        form.parse(req, function (err, fields, files) {
            if(err){
                throw err;
            }
            var oldPath = __dirname+"/"+files.tupian.path;
            var time = sd.format(new Date(),'YYYYMMDDHHmmss');
            var ran = parseInt(Math.random()*89999+10000);
            var extname = path.extname(files.tupian.name);
            var newPath = __dirname+"/upload/"+time+ran+extname;

            fs.rename(oldPath, newPath,function (err) {
                if (err){
                    throw err;
                }
                res.writeHead(200,{'content-Type':'text/plain'});
                res.end("成功");
            });
        });
    }else if (req.url == "/"){
        fs.readFile("./form.html", function (err, data) {
            res.writeHead(200,{'content-Type':'text/plain'});
            res.end("成功");
        })
    }else{
        res.writeHead(404,{'content-Type':'text/plain'});
        res.end("404");
    }
});
server.listen(8081, "127.0.0.1");