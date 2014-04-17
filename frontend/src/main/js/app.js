'use strict';

var pro2app = angular.module('pro2app', [
    'ngRoute',
    'ui.bootstrap',
    'caseControllers'
]);

pro2app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
          when('/login', {
            templateUrl: 'login.html',
            controller: 'loginController'
          }).
          when('/distribute', {
            templateUrl: 'distribute.html',
            controller: 'distributeController'
          }).
          when('/menu', {
            templateUrl: 'menu.html',
            controller: 'menuController'
          }).
          when('/cases', {
            templateUrl: 'cases.html',
            controller: 'casesController'
          }).
          when('/case/:caseId', {
            templateUrl: 'case.html',
            controller: 'caseController'
          }).
          otherwise({
            redirectTo: '/menu'
          });
    }
]);

pro2app.run(['$rootScope', '$location', 'userService',
    function ($rootScope, $location, userService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (!userService.isLoggedIn()) {
                console.log('No current user, redirect to login');
                $location.path('/login');
            }
        });
    }
]);