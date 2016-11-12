/**
 * Created by yanzexin on 16/11/12.
 */
$(document).ready(function () {
    var mailView = function () {
        this.load();
    };
    
    mailView.prototype.load = function () {
        $.ajax({
            url:'/user/mail',
            type:'POST',
            data: {
                name: $('#name').text()
            },
            async: true,
            success: function (data) {
                for (var index in data['mail']) {
                    var a = $('<a></a>');
                    a.attr('href', '/user/mail_detail?id=' + data['mail'][index]['id']);
                    a.append($('<small></small>').addClass('pull-right').addClass('text-muted').html(data['mail'][index]['date']));
                    a.append($('<strong></strong>').html("From: " + data['mail'][index]['sender']));
                    a.append($('<br/>'));
                    a.append($('<span></span>').html("Subject: " + data['mail'][index]['subject']));
                    $('#mail_list').append($('<li></li>').addClass('list-group-item').append(a));
                }
            },  
            error: function (err) {
                console.log(err);
            }
        });
    };
    
    $(new mailView());
});