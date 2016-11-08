/**
 * Created by yanzexin on 16/11/8.
 */
$(document).ready(function () {
    $('#login_form').bind('submit', function () {
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
                alert(data['success']);
                // console.log(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});