var caseControllers = angular.module('caseControllers', ['Auth', 'restangular']);

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

        $scope.cases = Case.getCasesByStep($state.current.data.step);

        hotkeys.add({
            combo: 'enter',
            description: 'Hent neste sak',
            callback: function() {
                $scope.getNextCase();
            }
        });

        $scope.getCases = function() {
            return Case.getCasesByStep($state.current.data.step);
        };
        
        $scope.getNextCase = function () {
            caze = $scope.cases.shift();
            $location.path('view/' + caze.caseid);
        };

        $scope.hasNextCase = function() {
            return $scope.cases.length !== 0;
        };
    }
]);

caseControllers.controller('caseController', ['$scope', '$stateParams', 'caseService', 'ProcessService',
    function($scope, $stateParams, Case, Processes) {
        Case.getCaseById($stateParams.caseId)
            .then(function(caze) {
                $scope.caze = caze;
                $scope.process = Processes.byId(caze.step).name;
                $scope.next = function(caze) {
                    caze.step = 2;
                    caze.patch();
                };
            });
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

caseControllers.controller('loginController', ['$scope', '$rootScope', '$location', 'AuthService',
    function($scope, $rootScope, $location, AuthService) {
        $scope.login = function() {
            AuthService.login($scope.username, $scope.pwd);
        };

        $scope.$on('Login', function() {
            $location.path('/menu');
        });

        $scope.$on('LoginFailed', function() {
            angular.element('#username').parent().addClass('has-error');
            angular.element('#pwd').parent().addClass('has-error');
        });
    }
]);
