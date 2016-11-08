var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('login!');
  res.render('index');
});

router.post('/login', function (req, res, next) {
  console.log('login!');
  var info = {};
  if (req.body.id == '15331348' && req.body.password == '15331348') {
    info['success'] = true;
    info['userName'] = 'yan';
  } else {
    info['success'] = false;
    info['info'] = 'Wrong Password';
  }
  res.json(info);
});

router.get('/main', function (req, res, next) {
  console.log('main');
  res.render('main', {
    userName: req.query.userName
  });
});


module.exports = router;
