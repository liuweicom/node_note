var fs = require('fs');
var http = require('http');

var server = http.createServer(function(req, res){
    //每次接受请求之后做的事情
    if(req.url == '/'){
        res.writeHead(200,{"content-Type": "text/html;charset=UTF8"});
        res.end("成功！");
    }else{
        res.writeHead(404,{"content-Type": "text/html;charset=UTF8"});
        res.end("失败！");
    }
});

server.listen(8081,"127.0.0.1");