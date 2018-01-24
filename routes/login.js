var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');
var mysql = require('mysql');

var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/userSql');
//使用DBConfig的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
//响应一个JSON数据
var responseJSON = function (req, res) {
    if (typeof res === 'undefined') {
        req.json({
            code: '-200',
            msg: '操作失败'
        });
    } else {
        req.json(res);
    }
};

router.get('/',function (req,res) {
    res.render('web/login/login');
});
router.get('/register',function (req,res) {
    res.render('web/login/register');
});

//注册用户
router.post('/addUser', function (req, res, next) {
    //从连接池获取连接
    pool.getConnection(function (err, connection) {
        //获取从前台传来的数据
        var param = req.body;
        //建立连接 增加一个用户信息
        connection.query(userSQL.insert, [param.username, param.password, param.nickname], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '增加成功'
                };
            }
            //以JSON形式，把操作结果返回给前台界面
            responseJSON(res, result);
            //释放连接
            connection.release();

        });
    });
});
//登录验证
router.post('/loginSub',function (req,res) {
    pool.getConnection(function(err,connection){
        var params=req.body;
        connection.query(userSQL.login,[params.username,params.password],function(err,result){
            if(result.length === 0 ){
               result={
                   code:'-200',
                   msg:'登陆失败',
               }
            }
            else {
                nickname=result[0].nickname;
                result={
                    code:'200',
                    msg:"登陆成功！",
                    昵称:nickname,
                }
                //res.render('web/index');
            }
            //以JSON形式，把操作结果返回给前台界面.
            responseJSON(res, result);
            //释放连接
            connection.release();
        });
    });
});

module.exports = router;
