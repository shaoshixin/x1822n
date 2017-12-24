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

router.get('/',function (req,res,next) {
    res.render('web/login/login');
});
router.get('/loginSub',function (req,res) {
    pool.getConnection(function(err,connection){
        var params=req.query||req.params;
        connection.query(userSQL.getUserById,[params.username],function(err,result){
            var nick = result;
            if(result){
                result={
                    code:200,
                    msg: nick
                };
            }
            //以JSON形式，把操作结果返回给前台界面
            responseJSON(res, result);
            //释放连接
            connection.release();
        });
    });
});

module.exports = router;
