var file = require('../models/file.js');
exports.showIndex = function (req,res) {
    // res.render('index',{
    //     "albumData": file.getAllAlbums()
    // });
    //NOde.js的编程思维，就是所有的东西，都是异步的，回调函数，把数据当成回调函数的参数来使用
    file.getAllDirectory(function (err, allAlbum) {
        if (err){
            res.send(err);
            return;
        }
        res.render('index',{
            "albumData": allAlbum
        });
    });
}
exports.showAlbum=function(req, res){
    var album = req.params["album"];
    file.getAllAlbums(album, function (err, allAlbum) {
        if (err){
            res.send(err);
            return;
        }
        res.render('album',{
            "albumName": album,
            "albumArray": allAlbum
        });
    });
}

