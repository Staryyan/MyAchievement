/**
 * Created by yanzexin on 16/11/8.
 */
$(document).ready(function () {
    $('#login').bind('click', function () {
        var params = {
            id: $('#id').val(),
            password: $('#password').val()
        };
        $.ajax({
            url:'/login',
            data:params,
            type:'POST',
            async:false,
            success: function (data) {
                if (data['success']) {
                    window.location.href = '/main';
                } else {
                    $('#reason').html(data['reason']);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});