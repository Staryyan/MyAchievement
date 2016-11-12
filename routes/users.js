var express = require('express');
var router = express.Router();
var DB = require('../bin/util/DB');
var db = new DB();
var GetDate = require('../bin/util/Date');
var date = new GetDate();

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

router.get('/mail_detail', function (request, response) {
  console.log('mail_detail');
  db.Database.query('select * from Mails where id = ?', [request.query.id], function (err, data) {
    if (err) console.log(err);
    else {
      response.render('mail_detail', {
        name: request.cookies.user.name,
        author: data[0]['sender'],
        date: data[0]['date'],
        subject: data[0]['subject'],
        content: data[0]['content']
      });
    }
  });
});

router.post('/sendMail', function (request, response) {
  console.log('sendMail');
  db.Database.query('insert into Mails (sender, receiver, subject, date, content) values (?, ?, ?, ?, ?)', [request.body.sender, request.body.receiver, request.body.subject, date.date, request.body.content], function (err, data) {
    if (err) {
      console.log(err);
      response.json({success: false});
    } else {
      db.Database.query('select id from Mails where sender = ? and receiver = ? and subject = ? and date = ? and content = ?', [request.body.sender, request.body.receiver, request.body.subject, date.date, request.body.content], function (err, data) {
        if (err) { console.log(err); }
        else {
          var id = data[0]['id'];
          db.Database.query('select mail from Users where name = ?', [request.body.receiver], function (err, data) {
            if (err) {console.log(err)}
            else {
              console.log(data[0]);
              var mail = JSON.parse(data[0]['mail']);
              mail.push({id: id, read: false});
              db.Database.query('update Users set mail = ? where name = ?', [JSON.stringify(mail), request.body.receiver], function (err, data) {
                if (err) { console.log(err) }
                else { response.json({success: true}); }
              })
            }
          });
        }
      });
    }
  });
});

router.post('/checkReceiver', function (request, response) {
  db.Database.query('select * from Users where name = ?', [request.body.receiver], function (err, data) {
    if (err) console.log(err);
    else {
      console.log(data.toString());
      if (data.toString() == '') {
        response.json({success: false});
      } else {
        response.json({success: true});
      }
    }
  })
});

module.exports = router;
