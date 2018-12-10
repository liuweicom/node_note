var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {

    var allData = "";
    //post请求接受的一个公式,node为了追求极致，它是一个小段一个小段接受的，是异步的
    req.addListener("data", function(chunk){
        allData+=chunk;
    });

    //传输完毕时，触发end
    req.addListener("end",function () {
        console.log(allData.toString());
        res.end();
    });

});
server.listen(8081, "127.0.0.1");