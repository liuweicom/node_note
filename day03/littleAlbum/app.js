var express = require('express');
var app = express();
var router =require('./controller/router');
// 设置模板引擎
app.set("view engine","ejs");

// 设置中间件，静态页面
app.use(express.static('./public'));
app.use(express.static('./uploads'));

// 路由
app.get('/',router.showIndex);
app.get('/:album',router.showAlbum);
app.get('/up',router.showUp);
app.post('/up',router.doPost);
app.use(function (req, res) {
    res.render('err',{
        "a": 1
    });
})
app.listen(8081);

