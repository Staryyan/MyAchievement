/**
 * Created by yanzexin on 16/11/2016.
 * All right reserved @Stary 16/11/2016
 */
app.controller('reviewCtrl', function ($scope, $http) {
    var length = 0;
    var content = {};
    $scope.load = function (len) {
        length = len;
        for (var index = 0; index < length; index++) {
            $scope.$watch('content'+index, (function(i) {
                return function (newValue) {
                    content['content' + i] = newValue;
                    console.log(newValue);
                    console.log(i);
                }
            })(index));
            $scope.$watch('score'+index, (function(i){
                return function (newValue) {
                    content['score'+i] = newValue;
                }
            })(index));
        }
    };
    $scope.up = function () {
        $scope.score0 = $scope.score0.replace(/\D/g,'');
        alert($scope.score0);
    };
    $scope.submit = function (id, index) {
        var info = content['content'+index];
        var score = content['score'+index];
        alert(score.match(/^[0-9]{1,3}/));
        if (info == '') {
            alert('wrong');
        } else if (score.match(/[0-9]{1,3}/)) {
            alert(parseInt(score));
        } else {
            alert('wrong');
        }
    };
});