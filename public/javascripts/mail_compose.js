/**
 * Created by yanzexin on 16/11/12.
 */
jQuery(document).ready(function(){
    $('.wysihtml5').wysihtml5();
    var mailCompose = function () {
        $('#error').hide();
        $('#send').bind('click', this.send.bind(this));
        $('#to').bind('blur', this.checkTo.bind(this));
    };

    mailCompose.prototype.checkTo = function () {
        if ($('#to').val() == '') {
            $('#error').html('Receiver can\'t be empty!').show();
            return false;
        } else {
            $.ajax({
                url: 'user/checkReceiver',
                data: {
                    receiver: $('#to').val()
                },
                type: 'POST',
                async: true,
                success: function (data) {
                    if (data['success']) {
                        $('#error').hide();
                    } else {
                        $('#error').html('Receiver don\'t exist!.').show();
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    };
    
    mailCompose.prototype.checkSubject = function () {
        if ($('#subject').val() == '') {
            $('#error').html('Subject can\'t be empty!').show();
            return false;
        } else {
            $('#error').hide();
            return true;
        }
    };
    
    mailCompose.prototype.checkContent = function () {
        if ($('#content').val() == '') {
            $('#error').html('Content can\'t be empty!').show();
            return false;
        } else {
            $('#error').hide();
            return true;
        }
    };

    mailCompose.prototype.send = function () {
        if (this.checkSubject() && this.checkContent()) {
            $.ajax({
                url: '/user/sendMail',
                data: {
                    sender: $('#name').text(),
                    receiver: $('#to').val(),
                    subject: $('#subject').val(),
                    content: $('#content').val()
                },
                type: 'POST',
                async: true,
                success: function (data) {
                    if (data['success']) {
                        window.location.href = '/mail_view';
                    } else {
                        $('#error').html(data['reason']);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    };

    $(new mailCompose());
});