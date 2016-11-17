/**
 * Created by yanzexin on 16/11/2016.
 * All right reserved @Stary 16/11/2016
 */
var app = angular.module('myApp', []);
app.controller('ctrl', function ($scope) {
    $scope.error = false;
    $scope.onBlur = function () {
        alert($scope.content);
        $scope.error = !!$scope.Form.inputText.$error.required;
        $scope.error = !!$scope.Form.inputText.$invalid;
    };


    // $scope.onClick = function () {
    //     myFunc('test');
    // }
});
// app.directive();
// var myFunc = function (greeting) {
//     greeting('test');
// };
// app.factory('greeting', function () {
//     return function (name) {
//        alert(name);
//    };

// });
