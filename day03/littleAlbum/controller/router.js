var file = require('../models/file.js');
var fs= require('fs');
var formidable = require('formidable');
var sd = require('silly-datetime');
var path = require('path');
exports.showIndex = function (req,res,next) {
    // res.render('index',{
    //     "albumData": file.getAllAlbums()
    // });
    //NOde.js的编程思维，就是所有的东西，都是异步的，回调函数，把数据当成回调函数的参数来使用
    file.getAllDirectory(function (err, allAlbum) {
        if (err){
            // res.send(err);
            next();
            return;
        }
        res.render('index',{
            "albumData": allAlbum
        });
    });
}
exports.showAlbum=function(req, res, next){
    var album = req.params["album"];
    file.getAllAlbums(album, function (err, allAlbum) {
        if (err){
            // res.send(err);
            next();
            return;
        }
        res.render('album',{
            "albumName": album,
            "albumArray": allAlbum
        });
    });
}
exports.showUp= function (req,res){
    file.getAllDirectory(function (err, allAlbum) {
        res.render("up",{
            albums: allAlbum
        });
        console.log('showUp---------');
        res.send();
    });
};

exports.doPost = function (req, res) {
    var form = formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+"/../uploads/");
    form.parse(req, function (err, fields, files, next) {
        if (err){
            next();
            return;
        }

        var ttt = sd.format(new Date(), "YYYYMMDDHHmmss");
        var ran = parseInt(Math.random()*8999+1000);
        var extname = path.extname(files.tupian.name);
        var oldPath = files.tupian.path;
        var newPath =path.normalize( __dirname+"/../uploads/"+fields.wenjianjia+"/"+ttt+ran+extname);
        fs.rename(oldPath,newPath,function (err) {
            if (err){
                res.send("改名失败");
                return;
            }
            res.send('成功！');
        })
    });
}

