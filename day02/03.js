var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var server = http.createServer(function(req,res){
    var pathName = url.parse(req.url).pathname;
    //判断用户输入的是文件还是文件夹地址
     if(pathName.indexOf('.')== -1){
         pathName+="/index.html";
     }
     var extname = path.extname(pathName);
    var fileUrl = path.normalize("../../../../work/"+pathName);
    console.log(fileUrl, 'fileUrl-------------------');
    fs.readFile(fileUrl, function(err, data){
        if(err){
            res.writeHead(404,{"content-Type":"text/html;charset=UTF8"});
            res.end('404,页面没有找到！');
        }
        console.log(extname,'extname-----');
        getMime(extname, function(mime){
            res.writeHead(200,{"content-Type": mime});
            res.end(data);
        })
    });
});
server.listen(8082,'127.0.0.1');

function getMime(extname, callback){
    fs.readFile('./mime.json',function(err, data){
        if(err){
            throw Error("找不到文件mime,json");
            return ;
        }
        //专程json
        var mimeJSON = JSON.parse(data);
        var mime = mimeJSON[extname] || 'text/plain';
        callback(mime) ;
    });
}