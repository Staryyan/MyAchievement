/**
 * Created by yanzexin on 16/11/9.
 */
var mysql = require('mysql');
function DB() {
    this.Database = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '161518324',
        database: 'MA'
    });
    this.Database.connect();    
}

module.exports = DB;
