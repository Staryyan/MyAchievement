// /**
//  * Created by yanzexin on 16/11/12.
//  */
// var DB = require('./util/DB');
// var db = new DB();
//
// // db.Database.query('insert into Mails (sender, receiver, subject, date, content) values (?, ?, ?, ?, ?)', ['Stary', 'yan', 'Test', '2016-11-11', 'Test'], function (data) {
// //     console.log(data);
// // });
// db.Database.query('create table test (id int)', function (err, data) {
//    if (err) {console.log(err)}
// });
var data = {author: '邓夏君', info: "很不错"};
console.log(JSON.stringify(data));