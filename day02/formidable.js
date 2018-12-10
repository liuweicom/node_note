var http = require('http');
var fs = require('fs');
var formiable = require('formidable');
var util = require("util");

var server = http.createServer(function (req, res) {

    if (req.url == "/dopost" && req.method.toLocaleLowerCase() == 'post'){
        var form = new formiable.IncomingForm();
        form.uploadDir = './upload';
        form.parse(req, function (err, fields, files) {
            if(err){
                throw err;
            }
            console.log(fields);
            console.log(files);
            console.log(util.inspect({fields: fields,files: files }));
            res.writeHead(200,{'content-type':'text/plain'});
            res.end("成功");
        })
    }
});
server.listen(8081, "127.0.0.1");