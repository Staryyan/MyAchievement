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
                    alert(data['userName']);
                    window.location  = 'main?userName='+data['userName'];
                } else {
                    alert('wrong');
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});