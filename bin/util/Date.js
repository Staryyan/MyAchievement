/**
 * Created by yanzexin on 16/11/12.
 */
var getDate = function () {
    this.convert();
};

getDate.prototype.convert = function () {
    var date = new Date();
    var y = date.getFullYear();
    var M = date.getMonth() + 1;
    var d = date.getDate();
    this.date = y + "-";
    if(M < 10)  {
        this.date += "0";
    }
    this.date += M + "-";

    if(d < 10) {
        this.date += "0";
    }
    this.date += d;
};
module.exports = getDate;
