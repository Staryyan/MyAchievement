var express = require('express');
var router = express.Router();
var DB = require('../bin/util/DB');
var db = new DB();

/* GET users listing. */
router.post('/notification', function(request, response) {
  db.Database.query('select * from Users where name = ?', [request.body.name], function (err, data) {
    if (err) console.log(err);
    else {
      var list = JSON.parse(data[0]['notification']);
      var notification_ids = [];
      for (var index in list) {
        if (!list[index]['read']) { notification_ids.push(list[index]['id']) }
      }
      db.Database.query('select * from Notifications', function (err, data) {
        if (err) console.log(err);
        else {
          var notification = [];
          for (var i in notification_ids) {
            for (var j in data) {
              if (data[j]['id'] == notification_ids[i]) {
                notification.push(data[j]);
                break;
              }
            }
          }
          response.json({notification: notification});
        }
      });
    }
  });
});

router.post('/mail', function (request, response) {
  db.Database.query('select * from Users where name = ?', [request.body.name], function (err, data) {
    if (err) console.log(err);
    else {
      var list = JSON.parse(data[0]['mail']);
      var mail_ids = [];
      for (var index in list) {
        if (!list[index]['read']) { mail_ids.push(list[index]['id']) }
      }
      db.Database.query('select * from Mails', function (err, data) {
        if (err) console.log(err);
        else {
          var mails = [];
          for (var i in mail_ids) {
            for (var j in data) {
              if (data[j]['id'] == mail_ids[i]) {
                mails.push(data[j]);
                break;
              }
            }
          }
          response.json({mail: mails});
        }
      });
    }
  });
});

router.post('/score', function (request, response) {
  db.Database.query('select * from Users where name = ?', [request.body.name], function (err, data) {
    if (err) console.log(err);
    else {
      response.json({score: JSON.parse(data[0]['score'])});
    }
  })
});

module.exports = router;
