var caseControllers = angular.module('caseControllers', ['restangular', 'Auth', 'SelectPerson', 'SelectAddress']);

caseControllers.controller('casesController', ['$scope', '$location', 'caseService', 'ProcessService',
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

caseControllers.controller('distributeController', ['$scope', 'caseService', '$location', '$state', 'hotkeys',
    function($scope, Case, $location, $state, hotkeys) {
        $scope.title = $state.current.data.title;

        Case.getCasesFromBE()
            .then(function(cases) {
                $scope.cases = Case.getByStep(cases, $state.current.data.step);
            });

        hotkeys.add({
            combo: 'enter',
            description: 'Hent neste sak',
            callback: function() {
                $scope.getNextCase();
            }
        });

        // Delete local hotkey, until hotkeys works with ui-route..
        // TODO: Hotkeys + ui-route
        $scope.$on('$destroy', function () {
            hotkeys.del('enter');
        });

        $scope.getCases = function() {
            return Case.getCasesByStep($state.current.data.step);
        };
        
        $scope.getNextCase = function () {
            caze = $scope.cases.shift();
            $location.path('view/' + caze.id);
        };

        $scope.hasNextCase = function() {
            return $scope.cases && $scope.cases.length !== 0;
        };
    }
]);

caseControllers.controller('caseController', ['$scope', '$stateParams', '$modal', 'caseService', 'ProcessService', 'Restangular',
    function($scope, $stateParams, $modal, Case, Processes, Restangular) {

        function setStepNames(step, $scope) {
            $scope.process = Processes.byId(step).name;
            $scope.prev_step = (step > 1) ? Processes.byId(step - 1).name : undefined;
            $scope.next_step = (step < 3) ? Processes.byId(step + 1).name : undefined;
        }

        Case.getCaseById($stateParams.caseId)
            .then(function(caze) {
                $scope.caze = caze;
                $scope.person = caze.person_nested;
                $scope.address = caze.address_nested;
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
                $scope.caze.patch({person: person.id}).then(function(caze) {
                    $scope.person = caze.person_nested;
                }, function (error) {
                    $scope.addAlert(error.data.detail);
                });
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
]);

caseControllers.controller('menuController', ['$scope', '$location', 'caseService',
    function($scope, $location, Case) {
        Case.getCasesFromBE().then(function(cases) {
            $scope.menuitems = [
                {name: 'Fordele oppgaver', url:'#/distribute', cnt: Case.countByStep(cases, 1)},
                {name: 'Registrere reiseregning', url:'#/register', cnt: Case.countByStep(cases, 2)},
                {name: 'Vedtak', url:'#/decision', cnt: Case.countByStep(cases, 3)},
                {name: 'Administrer', url: '', cnt: 0}
            ];
        });
    }
]);
