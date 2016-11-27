angular.module('passwordSaver')

.controller('loginController', function($scope, $state, $q, userService) {
    $scope.login = {
        userName: "",
        password: ""
    };
    $scope.errorMsg = '';
    $scope.signIn = submit;

    function submit() {
        if ($scope.login.userName == "" || $scope.login.password == "") {
            $scope.errorMsg = "Please enter all fields";
            return;
        } else {
            userService.authenticateUser($scope.login).then(function(res){
                if(res !=="Invalid User Name or Password"){
                    $state.go('home');
                    $scope.login = {};
                }
                else{
                    $scope.errorMsg = res;
                }
            },
            function(err){

            });
        }
    }
})
