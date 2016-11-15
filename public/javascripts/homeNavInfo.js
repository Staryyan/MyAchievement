/**
 * Created by yanzexin on 16/11/14.
 */
var app = angular.module('homeApp',[]);
app.controller('mailCtrl', function ($scope, $http) {
    $http.post('/user/mail').success(function (data) {
        console.log(data['mail']);
        $scope.mails = data['mail'];
    });
});
