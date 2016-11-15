/**
 * Created by yanzexin on 16/11/14.
 */
var app = angular.module('myApp', []);


app.controller('myCtrl', function ($scope) {
    $scope.info = true;
    $scope.$watch('name', function () {
        if ($scope.name == 'yan') {
            $scope.info = false;
        } else {
            $scope.info = true;
        }
    });
});
