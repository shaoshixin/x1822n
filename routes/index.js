var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('web/index');
});
exports.test = function(erq,res){
  res.send('Hello World!');
};
module.exports = router;
