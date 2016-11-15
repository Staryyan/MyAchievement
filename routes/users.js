var express = require('express');
var router = express.Router();
var DB = require('../bin/util/DB');
var db = new DB();
var GetDate = require('../bin/util/Date');
var date = new GetDate();
var formidable = require('formidable');
var fs = require('fs');

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
  console.log('mail');
  db.Database.query('select * from Mails where receiver = ? and hasRead = ?', [request.cookies.user.name, 0], function (err, data) {
    if (err) console.log(err);
    else {
      response.json({mail: JSON.parse(JSON.stringify(data))});
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
    db.Database.query('update Mails set hasRead = 1 where id = ?', [request.query.id], function (err, data) {
      if (err) console.log(err);
    });
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
      response.json({success: true});
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

router.post('/deleteMail', function (request, response) {
  db.Database.query('delete from Mails where id = ?', [request.body.id], function (err, data) {
    if (err) {
      console.log(err);
      response.json({success: false, error: err});
    } else {
      response.json({success: true});
    }
  });
});

router.post('/upload', function (request, response) {
  fs.mkdir('public/files/' + request.query.state, function () {
    var form = new formidable.IncomingForm();
    form._encoding = 'utf-8';
    form.uploadDir = 'public/files/' + request.query.state + '/';
    form.keepExtensions = true;
    form.hash = false;
    form.maxFieldsSize = 10 * 1024 * 1024;
    form.maxFilesize = 1;

    form.parse(request, function (err, field, files) {
      var fileName = files['files']['path'];
      db.Database.query('select * from Homework where studentId = ? and state = ?', [request.cookies.user.id, request.query.state], function (err, data) {
        if (err) {console.log(err)}
        else {
          if (data.length > 0) {
            if (data[0]['filePath'] != null) {
              fs.unlink(data[0]['filePath']);
            }
            db.Database.query('update Homework set filePath = ? where studentId = ? and state = ?', [fileName, request.cookies.user.id, request.query.state], function (err, data) {
              if (err) {console.log(err)}
              else {
                response.redirect('/main');
              }
            });
          } else {
            db.Database.query('insert into Homework (studentId, author, filePath, state) values(?, ?, ?, ?)', [request.cookies.user.id, request.cookies.user.name, fileName, request.query.state], function (err, data) {
              if (err) console.log(err);
              else {
                response.redirect('/main');
              }
            });
          }
        }
      });
    });
  });
});

router.get('/download', function (request, response) {
  db.Database.query('select * from Homework where id = ?', [request.query.id], function (err, data) {
    if (err) {console.log(err)}
    else {
      console.log(data);
      if (data.length > 0) {
        var path = data[0]['filePath'];
        var type = path.split('.');
        response.download(path, data[0]['state'] + ' ' + request.cookies.user.name + '.' + type[type.length - 1]);
      }
    }
  })
});

router.post('/deleteNotification', function (request, response) {
  db.Database.query('delete from Notifications where id = ? and receiverId = ?', [request.body.id, request.cookies.user.id], function (err, data) {
    if (err) { console.log(err)}
    else {
      response.json({success: true})
    }
  })
});

router.post('/notification_info', function (request, response) {
  db.Database.query('select * from Notifications where forAll = 1 or receiverId = ?', [request.cookies.user.id], function (err, data) {
    if (err) console.log(err);
    else {
      response.json({notification: data});
    }
  })
});

router.post('/allMails', function (request, response) {
  console.log('allMails');
  db.Database.query('select * from Mails where receiver = ? order by date', [request.cookies.user.name], function (err, data) {
    if (err) console.log(err);
    else {
      response.json({mail: JSON.parse(JSON.stringify(data))});
    }
  })
});

module.exports = router;
