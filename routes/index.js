var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('web/index');
});
router.get('login',function (req,res,next) {
    res.render('web/login/login')
});

module.exports = router;
