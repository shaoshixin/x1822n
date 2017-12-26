var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/userSql');
//使用DBConfig的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
//响应一个JSON数据
var responseJSON = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

router.get('/',function (req,res) {
    res.render('web/login/login');
});
router.get('/register',function (req,res) {
    res.render('web/login/register');
});
//登录验证
router.get('/loginSub',function (req,res) {
    pool.getConnection(function(err,connection){
        var params=req.query||req.params;
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
