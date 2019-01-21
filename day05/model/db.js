let mongodbCLient = require('mongodb').MongoClient;
let setting = require('./../setting');

//封装mongodb的数据库
function _connectDB(callback) {
    mongodbCLient.connect(setting.url, function (err, db) {
        if (err){
            console.log('连接失败---');
            callback(err,  null);
            return;
        }
        console.log('连接成功----');
        callback(null, db);
    })
}

//插入函数
exports.insertOne = function(collectionName, json, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).insertOne(json, function (err, result) {
            callback(err, result);
            db.close();
        })
    })
}

// 查找数据库
exports.find = function (collectionName, json, C, D) {
    let callback ;
    let skipNumber;
    let limitNumber;
    let sort;
    if (arguments.length === 4){
        let args = C;
         callback = D;
         skipNumber = args.pagemount * args.page || 0;
         limitNumber = args.pagemount || 0;
         sort = args.sort || {};
    } else if (arguments.length === 3){
        callback = C;
        skipNumber = 0;
        limitNumber = 0;
    } else{
       throw new  Error('find函数的参数个数，必须为3个，或者4个');
       return;
    }

    _connectDB(function (err, db) {
        let result=[];
        let cursor = db.collection(collectionName).find(json).skip(skipNumber).limit(limitNumber).sort(sort);
        cursor.each(function(err, doc){
            console.log(doc, 'dov-----------');
            if (err){
                callback(err, null);
                db.close();
                return;
            }
            if (doc != null){
                result.push(doc);
            }else{
                console.log(result, 'result---------1111111');
                callback(null, result);
                db.close();
            }
        });
    })
}

//删除
exports.deleteMany = function(collectionName, json, callback){
    _connectDB(function (err, db) {
        db.collection(collectionName).deleteMany(json, function (err, result) {
            callback(err, result);
            db.close();
        })
    })
};

// 修改
exports.updateMany = function (collectionName, json1, json2, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).updateMany(json1,json2, function (err, result) {
            callback(err,  result);
            db.close();
        });
    });
}

//获得所有的数量
exports.getAllCount = function (collectionName, callback) {
    _connectDB(function (err, db) {
        db.collection(collectionName).count({}).then(function (count) {
            callback(count);
            db.close();
        });
    })
}

