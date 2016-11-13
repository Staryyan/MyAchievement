/**
 * Created by yanzexin on 16/11/12.
 */
$(document).ready(function () {
    var mail_detail = function () {
        $('#content').html($('#content_help').text());
        this.id = window.location.href.slice(window.location.href.indexOf('id')+3);
        $('#trash').bind('click', this.trash.bind(this));
    };

    mail_detail.prototype.trash = function () {
        var that = this;
        $.ajax({
            url: '/user/deleteMail',
            data: {
                id: that.id
            },
            type: 'POST',
            success: function (data) {
                if (data['success']) {
                    window.location.href = '/mail_view'
                } else {
                    console.log(data['error']);
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    };
    $(new mail_detail());
});
