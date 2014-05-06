angular.module('pro2app', [
    'ui.bootstrap',
    'ui.router',
    'cfp.hotkeys',
    'caseControllers',
    'caseServices',
    'navbarController'
])

.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', 'RestangularProvider',
    function($urlRouterProvider, $stateProvider, $httpProvider, RestangularProvider) {

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

        $urlRouterProvider.otherwise('/menu');

        RestangularProvider.setBaseUrl('http://localhost:8000/api');
        RestangularProvider.setRequestSuffix('/');

        // CSRF-names for Django
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    }
])

.filter('CapFirst', function() {
    return function(input, scope) {
        return input.substring(0,1).toUpperCase() + input.substring(1);
    };
})

.filter('CapEach', function() {
    return function(input, scope) {
        return input.replace(/\w\S*/g, function (word) {
            return word.charAt(0).toUpperCase() + word.substring(1);
        });
    };
})

.controller('AppController', ['$scope', 'hotkeys', '$location', function($scope, hotkeys, $location) {
    hotkeys.add({
        combo: 'ctrl+alt+h',
        description: 'Gå til startsiden',
        callback: function() {
            $location.path('/menu');
        }
    });

    $scope.$on('Login', function(event, user) {
        $scope.currentUser = {
            username: user.username,
            name: user.first_name + ' ' + user.last_name,
            region: user.region,
            office: user.office,
            role: 'should this be here?'
        };
    });

    $scope.$on('Logout', function(event) {
        $scope.currentUser = undefined;
    });
}]);
