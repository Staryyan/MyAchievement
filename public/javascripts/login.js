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
                    // $.post('/main', {id: data['user']['id'], name: data['user']['name']}, function () {
                    //     alert('fuck!');
                    // });
                } else {
                    alert(data['success']);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});