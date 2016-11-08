var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('login!');
  res.pipe('Main.html');
  // res.render('index');
});

router.post('/login', function (req, res, next) {
  var info = {};
  if (req.body.id == '15331348' && req.body.password == '15331348') {
    info['success'] = true;
  } else {
    info['success'] = false;
    info['info'] = 'Wrong Password';
  }
  res.json({success: true});
});

module.exports = router;
