angular.module('case', [])

.controller('caseController', ['$scope', '$stateParams', '$modal', 'caseService', 'ProcessService', 'Restangular',
    function($scope, $stateParams, $modal, Case, Processes, Restangular) {

        function setStepNames(step, $scope) {
            $scope.process = Processes.byId(step).name;
            $scope.prev_step = (step > 1) ? Processes.byId(step - 1).name : undefined;
            $scope.next_step = (step < 3) ? Processes.byId(step + 1).name : undefined;
        }

        $scope.print_address = function(address) {
            if (address !== undefined) {
                return address.street + ' ' +
                    address.number + address.subnum + ' ' +
                    address.postid;
            } else {
                return '';
            }
        };

        $scope.current_journey = undefined;
        $scope.current_journey_index = undefined;
        $scope.set_current_journey = function(index) {
            if (index >= 0 && index < $scope.journeys.length) {
                $scope.current_journey = $scope.journeys[index];
                $scope.current_journey_index = index;
            }
        };
        $scope.get_class = function(index) {
            return (index === $scope.current_journey_index) ? 'active' : '';
        };

        Case.getCaseById($stateParams.caseId)
            .then(function(caze) {
                $scope.caze = caze;
                $scope.person = caze.person_nested;
                $scope.address = caze.address_nested;
                $scope.journeys = caze.journeys_nested;
                setStepNames(caze.step, $scope);
                $scope.next = function(caze) {
                    caze.step = Math.min(caze.step+1, 3);
                    caze.patch();
                    setStepNames(caze.step, $scope);
                };
                $scope.prev = function(caze) {
                    caze.step = Math.max(caze.step-1, 1);
                    caze.patch();
                    setStepNames(caze.step, $scope);
                };
            });

        $scope.showPersonSelect = function () {
            $modal.open({
                templateUrl: 'person/select_person.html',
                controller: 'SelectPersonController',
                backdrop: 'static'
            }).result.then(function (person) {
                if (!$scope.person || person.id !== $scope.person.id) {
                    $scope.address = undefined;
                    $scope.caze.patch({
                        person: person.id,
                        address: null 
                    }).then(function(caze) {
                        $scope.person = caze.person_nested;
                    }, function (error) {
                        $scope.addAlert(error.data.detail);
                    });
                }
            });
        };

        $scope.showAddressSelect = function (person) {
            if (person !== undefined) {
                $modal.open({
                    templateUrl: 'address/select_address.html',
                    controller: 'SelectAddressController',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        person: function() {
                            return person;
                        }
                    }
                }).result.then(function (address) {
                    $scope.caze.patch({address: address.id}).then(function(caze) {
                        $scope.caze = caze;
                        $scope.address = caze.address_nested;
                    }, function (err) {
                        $scope.addAlert(err.data.detail);
                    });
                });
            }
        };
    }
])

.controller('casesController', ['$scope', '$location', 'caseService', 'ProcessService',
    function($scope, $location, Case, Processes) {
        $scope.cases = Case.getCasesFromBE().$object;

        $scope.process_name = function(id) {
            return Processes.byId(id).name;
        };

        $scope.view_case = function(caze) {
            $location.path('view/' + caze.id);
        };
    }
]);
