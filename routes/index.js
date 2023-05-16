var express = require('express');
var router = express.Router();
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/register', require('./orders'));
router.use('/customer', require('./orders'));

module.exports = router;
