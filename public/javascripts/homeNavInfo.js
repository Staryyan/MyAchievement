/**
 * Created by yanzexin on 16/11/14.
 */
var app = angular.module('homeApp',[]);
app.controller('notificationCtrl', function ($scope, $http) {
    $http.post('/user/mail').success(function (data) {
        if (data['mail'].length >= 5) {
            $scope.mails = data['mail'].slice(0, 5);
        } else {
            $scope.mails = data['mail'];
        }
    });
    $http.post('/user/notification_info').success(function (data) {
        if (data['notification'].length >= 5) {
            $scope.notifications = data['notification'].slice(0, 5);
        } else {
            $scope.notifications = data['notification'];
        }
    });
});
