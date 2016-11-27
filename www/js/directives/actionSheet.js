angular.module('passwordSaver')
    .directive('actionSheet', function($ionicActionSheet, $timeout, $state) {
        return {
            restrict: 'E',
            templateUrl: "../../templates/action-sheet.html",
            transclude: true,
            link: link
        };

        function link(scope, elem, attrs) {

            elem.on('click', function() {

                var hideSheet = $ionicActionSheet.show({
                    buttons: [
                        { text: 'Change Password' },
                        { text: 'About' },
                        { text: 'Exit' }
                    ],
                    titleText: 'Settings',
                    cancelText: 'Cancel',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        if (index === 0) {
                            $state.go('change-password');
                        }
                        if (index === 1) {
                            $state.go('about');
                        }
                        if (index === 2) {
                            $state.go('login');
                        }
                        return true;
                    }
                });

                $timeout(function() {
                    hideSheet();
                }, 10000);

            });

        }

    });
