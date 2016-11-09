var express = require('express');
var router = express.Router();
var DB = require('../bin/util/DB');
var db = new DB();
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('login!');
  res.render('index');
});

  router.post('/login', function (req, res) {
    console.log('login!');
    db.Database.query('select * from Users where id = ? and password = ?', 
        [req.body.id, req.body.password], function (err, data) {
          if (err) console.log(err);
          if (data.toString() != '') {
            res.json({'success': true, 'user': data[0]});
          } else {
            res.json({'success': false});
          }
        });
  });

router.get('/main', function (req, res) {
  console.log('main');
  res.render('main');
});

module.exports = router;
