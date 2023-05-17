var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', require('./auth'));
router.use('/customer', require('./customers'));

module.exports = router;
