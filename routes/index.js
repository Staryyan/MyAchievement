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
            res.cookie('user', {id: data[0]['id'], name: data[0]['name'], status: data[0]['status']}, { httpOnly:true});
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
    if (req.cookies.user == undefined) {
        res.render('index');
    } else {
        // if (req.cookies.user.status == 'student') {
            db.Database.query('Select * from Homework where studentId = ? Order by state', [req.cookies.user.id], function (err, data) {
                console.log(JSON.parse(JSON.stringify(data)));
                res.render('main', {
                    name: req.cookies.user.name,
                    status: req.cookies.user.status,
                    HomeworkInfo: JSON.parse(JSON.stringify(data))
                });
            });
    }
});

router.get('/mail_view', function (request, response) {
    console.log('mail_view');
    response.render('mail_view', {
        name: request.cookies.user.name
    });
});

router.get('/mail_compose', function (request, response) {
    console.log('mail_compose');
    response.render('mail_compose', {
        name: request.cookies.user.name
    });
});

router.get('/homework', function (request, response) {
   console.log('homework');
    db.Database.query('select score, state, comment from Homework where studentId = ? order by state', [request.cookies.user.id], function (err, data) {
        response.render('homework', {
            name: request.cookies.user.name,
            homework: JSON.parse(JSON.stringify(data))
        });
    });
});

router.get('/notification', function (request, response) {
    db.Database.query('select * from Notifications where forAll = 1 or receiverId = ? order by date desc', [request.cookies.user.id], function (err, data) {
        if (err) console.log(err);
        else {
            console.log(data);
            response.render('notification', {name: request.cookies.user.name, Notification: JSON.parse(JSON.stringify(data))});
        }
    });
});

router.get('/evaluate', function (request, response) {
   db.Database.query('select * from Homework', function (err, data) {
       if (err) console.log(err);
       else {
           response.render('evaluate', {
               name: request.cookies.user.name,
               status: request.cookies.user.status,
               homework: JSON.parse(JSON.stringify(data))
           });
       }
   });
});

module.exports = router;
