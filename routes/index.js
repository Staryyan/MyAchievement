var express = require('express');
var router = express.Router();
var DB = require('../bin/util/DB');
var db = new DB();
/* GET home page. */
router.get('/', function(req, res) {
  res.clearCookie('user');
  res.render('index');
});

router.post('/login', function (req, res) {
  console.log('login!');
  db.Database.query('select * from Users where id = ?', 
      [req.body.id], function (err, data) {
        var info = {};
        if (err) console.log(err);
        if (data.toString() != '') {
          if (data[0]['password'] == req.body.password) {
            res.cookie('user', {id: data[0]['id'], name: data[0]['name']}, { httpOnly:true});
            info['success'] = true;
          } else {
            info['success'] = false;
            info['reason'] = 'Wrong Password';
          }
        } else {
          info['success'] = false;
          info['reason'] = 'Wrong Id';
        }
        res.json(info);
      });
});

router.get('/main', function (req, res) {
  console.log('main');
  res.render('main', {
    name: req.cookies.user.name
  });
});

module.exports = router;
