angular.module('passwordSaver')

.controller('forgotPasswordController', function($scope, $state, userService) {
    $scope.forgotPassword = {
        emailId: "",
        userName: ""
    };
    $scope.errorMsg = '';
    $scope.forgotPasswordCheck = forgotPasswordCheck;

    function forgotPasswordCheck() {
        if ($scope.forgotPassword.emailId == "" || $scope.forgotPassword.userName == "") {
            $scope.errorMsg = "Please fill all fileds";
            return;
        } else {
            userService.forgotPassword($scope.forgotPassword).then(function(res){
                if(res == "success"){
                    $scope.errorMsg = "Password is sent to your email";
                    $scope.forgotPassword = {};
                }
                else{
                    $scope.errorMsg = res;
                }
            });
        }
    }
});
