angular.module('pro2app', [
    'ngRoute',
    'ui.bootstrap',
    'ui.router',
    'cfp.hotkeys',
    'caseControllers',
    'caseServices',
    'navbarController'
])

.config(['$routeProvider', '$stateProvider', '$httpProvider',
    function($routeProvider, $stateProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: "/menu"});

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
          .state('decision', {
              url: '/decision',
              templateUrl: 'distribute.html',
              controller: 'distributeController',
              data: {
                  title: 'Fatte vedtak',
                  step: 'decision'
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

        // CSRF-names for Django
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }
])

.controller('AppController', ['$scope', 'hotkeys', '$location', function($scope, hotkeys, $location) {
    hotkeys.add({
        combo: 'ctrl+alt+h',
        description: 'Gå til startsiden',
        callback: function() {
            $location.path('/menu');
        }
    });

    $scope.$on('Login', function(event, user) {
        console.log(event);
        $scope.currentUser = {
            username: user.username,
            role: 'fakerole',
            region: 'fakeregion'
        };
        console.log("Login Event in AppController, username="+$scope.currentUser);
    });
}]);
