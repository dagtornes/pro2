var navbarController = angular.module('navbarController', ['Auth']);

navbarController.controller('navbarController', ['$scope', 'AuthService',
    function($scope, AuthService) {
        $scope.logout = function() {
            AuthService.logout();
            $scope.currentUser = User.currentUser;
        };
        
        $scope.$on('Login', function (event) {
            $scope.currentUser = User.currentUser;
        });

        $scope.$on('Logout', function (event) {
            $scope.currentUser = User.currentUser;
        });
    }
]);
