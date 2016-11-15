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

    $(new navInfo());
});