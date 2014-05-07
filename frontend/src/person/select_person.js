angular.module('SelectPerson', [])

.controller('SelectPersonController', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    $scope.ok = function() {
        $modalInstance.close("OK");
    };

    $scope.close = function() {
        $modalInstance.dismiss("Avbrutt");
    };
}]);
