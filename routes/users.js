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
//添加用户
router.get('/addUser', function (req, res, next) {
  //从连接池获取连接
  pool.getConnection(function (err, connection) {
    //获取从前台传来的数据
    var param = req.query || req.params;
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
//以uid查询用户，注意对查询结果 result的解析username=result[0].username
router.get('/getUserById',function(req,res,next){
  pool.getConnection(function(err,connection){
    var params=req.query||req.params;
    connection.query(userSQL.getUserById,[params.uid],function(err,result){
      if(result){
        result={
          code:200,
          msg:result[0]
        };
      }
      responseJSON(res, result);
      connection.release();
    });
  });
});
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
