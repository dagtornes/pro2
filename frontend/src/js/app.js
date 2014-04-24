'use strict';

var pro2app = angular.module('pro2app', [
    'ui.bootstrap',
    'ui.router',
    'caseControllers',
    'navbarController'
]);

pro2app.config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
          .state('login', {
              url: "/login",
              templateUrl: 'login.html',
              controller: 'loginController'
          })
          .state('menu', {
              url: '/menu',
              templateUrl: 'menu.html',
              controller: 'menuController'
          })
          .state('case', {
              url: '/case',
              templateUrl: 'cases.html',
              controller: 'casesController'
          })
          .state('view', {
              url: '/view/:caseId',
              templateUrl: 'case.html',
              controller: 'caseController'
          })
          .state('distribute', {
              url: '/distribute',
              templateUrl: 'distribute.html',
              controller: 'distributeController',
              data: {
                  title: 'Fordele oppgaver',
                  step: 'distribute'
              }
          })
          .state('register', {
              url: '/register',
              templateUrl: 'distribute.html',
              controller: 'distributeController',
              data: {
                  title: 'Registrere reiseregning',
                  step: 'register'
              }
          });
    }
]);
