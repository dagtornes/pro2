var navbarController = angular.module('navbarController', ['Auth']);

navbarController.controller('navbarController', ['$scope', 'AuthService',
    function($scope, AuthService) {
        $scope.logout = function() {
            AuthService.logout();
        };
    }
]);
