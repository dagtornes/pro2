var navbarController = angular.module('navbarController', []);

navbarController.controller('navbarController', ['$scope', 'userService',
    function($scope, User) {
        $scope.logout = function() {
            User.logout();
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
