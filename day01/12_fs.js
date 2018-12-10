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
    var dirLists = [];
    fs.readdir("../../../work/", function(err, files){
        // for(var i=0; i<files.length; i++){
        //     (function(i){
        //        fs.stat("../../../work/"+files[i],function(err, stats){
        //            //
        //            if(stats.isDirectory()){
        //                dirLists.push(files[i]);
        //            }
        //        });
        //     })(i);
        //     console.log(dirLists);
        // }
        //上面的写法有问题。每次打印的dirlists都是为空，node是非阻塞的，存在异步，就会继续向后执行，所以先打印了console.log所以都是为空

        //将异步变成同步
        (function iterator(i){
            if(i == files.length){
                console.log(dirLists);
                return;
            }
            fs.stat("../../../work/"+files[i], function(err, stats){
                //
                if(stats.isDirectory()){
                    dirLists.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);

    });
    res.end();
}).listen(3000,'127.0.0.1');
