angular.module('passwordSaver')

.controller('registerUserController', function($scope, $state, $q, userService) {
    $scope.newUser = {
        name :"",
        userName: "",
        emailId: "",
        password: "",
        cnfrmPassword: ""
    };
    $scope.errorMsg = '';
    $scope.registerUser = registerUser;

    function registerUser() {
        if ($scope.name =="" || $scope.newUser.userName == "" || $scope.newUser.emailId == "" || $scope.newUser.password == "" || $scope.newUser.cnfrmPassword == "") {
            $scope.errorMsg = "Please enter all fields";
            return;
        }
        if ($scope.newUser.password.length < 8) {
            $scope.errorMsg = "Password must contain 8 characters";
            return;
        }
        if ($scope.newUser.password !== $scope.newUser.cnfrmPassword) {
            $scope.errorMsg = "Passwords Didnt Match";
            return;
        } else {
            $scope.errorMsg = "";
             userService.registerUser($scope.newUser).then(function(res) {
                    if (res === "success") {
                        $scope.newUser = {};
                        $state.go('home');
                    }
                    else if(res !== "success"){
                        $scope.errorMsg = res.message;
                    } 
                    else {
                        $scope.errorMsg = 'Some Error Occured Try after some time';
                    }
                },
                function(err) {
                    console.log("Error");
                });

        }
    }
})
