angular.module('SelectAddress', [])

.controller('SelectAddressController', ['$scope', '$modalInstance', 'addresses',
        function($scope, $modalInstance, addresses) {

    $scope.addresses = addresses;

    $scope.setAddress = function (address) {
        $modalInstance.close(address);
    };

    $scope.close = function() {
        $modalInstance.dismiss(undefined);
    };

    $scope.createAddress = function () {

    };
}]);
