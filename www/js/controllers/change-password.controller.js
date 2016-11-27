angular.module('passwordSaver')

.controller('changePasswordController', function($scope, $state, userService) {
    $scope.resetPassword = {
        oldPassword: "",
        newPassword: "",
        cnfrmPassword: "",
        userName : sessionStorage.userName
    };
    $scope.errorMsg = '';
    $scope.updatePassword = updatePassword;

    function updatePassword() {
        if ($scope.resetPassword.oldPassword == "" || $scope.resetPassword.newPassword == "" || $scope.resetPassword.cnfrmPassword == "") {
            $scope.errorMsg = "Please enter all fields";
            return;
        }
        if ($scope.resetPassword.newPassword.length < 8) {
            $scope.errorMsg = "Password must contain 8 characters";
            return;
        }
        if ($scope.resetPassword.newPassword !== $scope.resetPassword.cnfrmPassword) {
            $scope.errorMsg = "Passwords Didnt Match";
            return;
        } else {
           userService.resetPassword($scope.resetPassword).then(function(res){
              alert(res);
              $scope.resetPassword ={};
              $state.go('login');
           });
                
        }
    }

})
