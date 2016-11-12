/**
 * Created by yanzexin on 16/11/12.
 */
var DB = require('./util/DB');
var db = new DB();

// db.Database.query('insert into Mails (sender, receiver, subject, date, content) values (?, ?, ?, ?, ?)', ['Stary', 'yan', 'Test', '2016-11-11', 'Test'], function (data) {
//     console.log(data);
// });
db.Database.query('select id from Users where id = 15331348', function (err, data) {
   if (err) {console.log(err)}
    console.log(data[0]['id']);
});