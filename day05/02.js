/**
 * 制作留言板
 * @type {createApplication}
 *
 *  <!--通过ejs模板的方式获取，灵活性不大，每一次render，都必须把所有变量都带上，麻烦-->
 <!--<div class="list-group">-->
 <!--<% for (var i=0; i< noteList.length; i++){ %>-->
<!--<a href="#" class="list-group-item active">-->
<!--<h4 class="list-group-item-heading"><%= noteList[i].xingming%>-<%= noteList[i].shijian%></h4>-->
<!--<p class="list-group-item-text">-->
<!--<%= noteList[i].liuyan%>-->
<!--<a href="/shanchu?id=<%= noteList[i].id%>" class="shanchu">删除</a>-->
<!--</p>-->
<!--</a>-->
<!--<%}%>-->
 <!--</div>-->

 */


let express = require('express');
let app = express();
let db = require('./model/db');
var formidable = require('formidable');
var ObjectId = require('mongodb').ObjectID;


app.set('view engine', "ejs");
app.use(express.static('./public'));
let count ;
//显示留言板
app.get('/',function (req,res,next) {
    db.getAllCount('liuyanben',function (count) {
        count = count;
        res.render("index",{
                    'pagemount': count
        })
    })
})

//读取所有留言
app.get('/du',function (req,res,next) {
    var page = parseInt(req.query.page);
    console.log(page,'page-------');
    db.find('liuyanben',{},{"sort":{"shijian": -1},"pagemount": 20, "page": page},function (err, result) {
        console.log(result, 'result----------');
        res.json({"result": result});
    })
})

//提交留言
app.post('/tijiao',function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        console.log(fields.xingming,fields.liuyan,'fields.liuyan---------' );
        db.insertOne('liuyanben',{
            "xingming": fields.xingming,
            "liuyan": fields.liuyan,
            "shijian": new Date()
        },function (err, result) {
            console.log(result, 'result------提交-----');
            if (err){
                res.send({"result": -1});
                return;
            } else{
                res.send({"result": 1});
            }
        })
    });
})

app.get("/shanchu",function (req,res,next) {
    var id = req.query.id;
    db.deleteMany("liuyanben",{"_id": ObjectId(id)},function (err, resulet) {
        res.redirect("/");
    })
})

app.listen(3000);
