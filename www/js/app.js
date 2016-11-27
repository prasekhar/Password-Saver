var db = null;
angular.module('passwordSaver', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function() {

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
        if (window.cordova) {
            db = $cordovaSQLite.openDB({ name: "passwordsaver.db", location: "default" }); //device
        } else {
            db = window.openDatabase("passwordsaver.db", '1', 'my', 1024 * 1024 * 100); // browser
        }

    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginController'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'homeController'
        })
        .state('forgot-password', {
            url: '/forgot-password',
            templateUrl: 'templates/forgot-password.html',
            controller: 'forgotPasswordController'
        })
        .state('change-password', {
            url: '/change-password',
            templateUrl: 'templates/change-password.html',
            controller: 'changePasswordController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'registerUserController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'templates/about.html',
            controller: ''
        });

    $urlRouterProvider.otherwise('/login');

});
