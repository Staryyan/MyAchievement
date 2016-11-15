app.controller('mailCtrl', function ($scope, $http) {
    $http.post('/user/allMails').success(function (data) {
        $scope.mails = data['mail'];
    });
});
