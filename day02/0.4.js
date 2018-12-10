var fs = require('fs');
var http = require('http');
var ejs = require('ejs');

var server = http.createServer(function (req, res) {

    fs.readFile("./index.ejs", function (err, data) {
       // 绑定模板
        var template = data.toString();
        var dictionary = {
            a: 6
        };
        var html = ejs.render(template, dictionary);
        res.writeHead(200,{'Content-type': "text/html;charset=UTF8"});
        res.end(html);
    });
});
server.listen(8081, "127.0.0.1");