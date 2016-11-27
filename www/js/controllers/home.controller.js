angular.module('passwordSaver')

.controller('homeController', function($scope, $state) {
   $scope.userName = sessionStorage.userName;
})
