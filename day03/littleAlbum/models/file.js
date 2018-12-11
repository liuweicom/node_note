var fs = require('fs');
exports.getAllDirectory = function (callback) {
    fs.readdir("./uploads", function (err, files) {
        var allAlbum = [];
        var i = 0;
        (function iterator(i){
            if (i == files.length){
                console.log(allAlbum);
                console.log(callback);
                callback(null, allAlbum);
                return;
            }
            fs.stat("./uploads/" + files[i], function (err, stats) {
                if (err){
                    callback(err, null);
                    return;
                }
                if (stats.isDirectory()) {
                    allAlbum.push(files[i]);
                }
                    iterator(++i);
            });
        })(i);
    });
}

exports.getAllAlbums = function (dir, callback) {
    fs.readdir("./uploads/"+dir+"/", function (err, files) {
        var allAlbum = [];
        var i = 0;
        if (err){
            callback(err, null);
        }
        if(!files){
            return;
        }
        (function iterator(i){
            if (i >= files.length){
                console.log(allAlbum);
                callback(null, allAlbum);
                return;
            }
            fs.stat("./uploads/" + dir+"/" + files[i], function (err, stats) {
                if (err){
                    callback(err, null);
                    return;
                }
                if (stats.isFile()) {
                    allAlbum.push(files[i]);
                }
                iterator(++i);
            });
        })(i);
    });
}

