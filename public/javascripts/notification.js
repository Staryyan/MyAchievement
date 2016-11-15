/**
 * Created by yanzexin on 15/11/2016.
 * All right reserved @Stary 15/11/2016
 */
function del(id) {
    $.ajax({
       url:'/user/deleteNotification',
        data:{id: id},
        type: 'POST',
        async: true,
        success: function (data) {
            if (!data['success']) {console.log(data['err'])}
        },
        error: function (err) {
            console.log(err);
        }
    });
}