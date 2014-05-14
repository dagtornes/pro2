angular.module('SelectAddress', ['restangular'])

.controller('SelectAddressController', ['$scope', '$modalInstance', 'person', 'Restangular',
        function($scope, $modalInstance, person, Restangular) {

    $scope.addresses = person.address_nested;
    $scope.address = {person: person.id};
    $scope.showCreate = false;

    $scope.setAddress = function (address) {
        $modalInstance.close(address);
    };

    $scope.close = function() {
        $modalInstance.dismiss(undefined);
    };

    $scope.createAddress = function () {
        Restangular.all('address').post($scope.address).then(function(address) {
            $modalInstance.close(address);
        });
    };

    $scope.show = function () {
        $scope.showCreate = true;
    };
}]);
