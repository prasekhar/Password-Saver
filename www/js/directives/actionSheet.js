angular.module('passwordSaver')
    .directive('actionSheet', function($ionicActionSheet, $state) {
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
                        { text: '<i class="icon ion-power"></i> Exit' }
                    ],
                    titleText: 'Settings',
                    cancelText: 'Cancel',
                    cancel: function() {
                       hideSheet();
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

            });

        }

    });
