let express = require('express');
let  app = express();
let  mongoClient = require('mongodb').MongoClient;

/**
 * 开始安装了mongodbV3。一直都报 db.collection没有这个方法，所有怀疑是版本的问题，固定为2.2的版本，以切没问题
 */
app.get('/',function (req, res) {

    //url就是数据库的地址，/表示数据库
    //假如数据库不存在，没关系，程序会帮你自动创建一个数据库
    const url= "mongodb://localhost:27017/noteDB";
    //链接数据库
    mongoClient.connect(url,function (err, db) {
        //回调函数表示连接成功做的事情，db参数就是连接上的数据库实体
        if (err){
            console.log('数据库连接失败');
            return;
        }
        console.log( err, db,'db-------------');
        console.log('数据库连接成功！');
        // db.close();
        // 插入数据库，集合如果不存在，也没有关系，程序会帮你创建
        db.collection('student').insertOne({
            "name": 'gouzi12',
            "age": parseInt(Math.random()*100+10)
        },function (err, result) {
            if (err){
                console.log('插入失败！');
                return;
            }
            //插入之后做的事情，result表示插入结果
            console.log(result);
            res.send(result);
            db.close();
        })
    })
});
app.listen(3000);
