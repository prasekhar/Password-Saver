angular.module('passwordSaver')
    .factory('emailService', function($cordovaEmailComposer) {

        return {
            sendEmail: sendEmail
        }

        function sendEmail(data) {
            var bodyHtml = '<html><p>Your password linked with </p><b>' + data.email + '</b> is <i>' + data.password + " </i></html>";
            var email = {
                to: data.email,
                subject: 'Password Saver Password',
                body: bodyHtml,
                isHtml: true
            }

            $cordovaEmailComposer.isAvailable().then(function(res) {
                console.log(res);
                $cordovaEmailComposer.open(email).then(null, function() {
                    // user cancelled email
                });

            }, function(error) {
                return "error";
            });

        }
    });
