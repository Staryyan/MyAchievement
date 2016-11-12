/**
 * Created by yanzexin on 16/11/12.
 */
$(document).ready(function () {
    var navInfo = function () {
        this.load();
    };
    
    navInfo.prototype.load = function () {
        var that = this;
        $.ajax({
            url: '/user/notification',
            type: 'POST',
            data: { name: $('#name').text() },
            async: true,
            success: function (data) {
                that.notification = data['notification'];
                that.load_notification();
            },
            error: function (err) {
                console.log(err);
            }
        });
        $.ajax({
            url: '/user/mail',
            type: 'POST',
            data: { name: $('#name').text() },
            async: true,
            success: function (data) {
                that.mail = data['mail'];
                that.load_mail();
            },
            error: function (err) {
                console.log(err);
            }
        });
    };
    
    navInfo.prototype.load_notification = function () {
        for (var index in this.notification) {
            var a = $('<a></a>');
            var span = $('<span></span>');
            span.html(this.notification[index]['msg']);
            a.append(span);
            var list = $('<li></li>').addClass('new').append(a);
            $('#notification').append(list);
        }
    };
    
    navInfo.prototype.load_mail = function () {
        for (var index in this.mail) {
            var a = $('<a></a>');
            var span = $('<span></span>').addClass('desc');
            span.append($('<span></span>').addClass('name').text(this.mail[index]['sender']));
            span.append($('<span></span>').addClass('msg').text(this.mail[index]['subject']));
            a.append(span);
            var list = $('<li></li>').addClass('new').append(a);
            $('#mail').append(list);
        }
    };
    $(new navInfo());
});