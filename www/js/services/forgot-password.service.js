angular.module('passwordSaver')

.factory('forgotPasswordService', function() {

    return {
        authenticate: authenitcateUser
    };

    function authenitcateUser(user) {
        console.log(user);
    }
});
