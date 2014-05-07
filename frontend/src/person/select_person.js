angular.module('SelectPerson', ['restangular'])

.controller('SelectPersonController', ['$scope', '$modalInstance', 'Restangular',
        function($scope, $modalInstance, Restangular) {

    $scope.setPerson = function (person) {
        $modalInstance.close(person);
    };

    $scope.persons = undefined;
    $scope.search = function() {
        Restangular.all('persons').getList().then(function(persons) {
            $scope.persons = persons;
        });
    };

    $scope.close = function() {
        $modalInstance.dismiss(undefined);
    };
}]);
