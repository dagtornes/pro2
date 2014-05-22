angular.module('SelectAddress', ['restangular'])

.controller('SelectAddressController', ['$scope', '$modalInstance', 'data', 'Restangular',
        function($scope, $modalInstance, data, Restangular) {

    $scope.addresses = data.addresses;
    $scope.address = data.address;
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
