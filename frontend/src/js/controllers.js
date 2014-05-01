var caseControllers = angular.module('caseControllers', ['Auth']);

caseControllers.controller('casesController', ['$scope', '$location', 'caseService',
    function($scope, $location, Case) {
        $scope.cases = Case.getCases();

        $scope.view_case = function(caze) {
            $location.path('view/' + caze.caseid);
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

caseControllers.controller('caseController', ['$scope', '$stateParams', 'caseService',
    function($scope, $stateParams, Case) {
        $scope.caze = Case.getCaseById($stateParams.caseId);

        $scope.advance = function() {
            Case.advance($scope.caze);
            $scope.next_step = Case.next_step($scope.caze);
            $scope.prev_step = Case.prev_step($scope.caze);
        };

        $scope.prev = function() {
            Case.prev($scope.caze);
            $scope.next_step = Case.next_step($scope.caze);
            $scope.prev_step = Case.prev_step($scope.caze);
        };

        $scope.next_step = Case.next_step($scope.caze);
        $scope.prev_step = Case.prev_step($scope.caze);
    }
]);

caseControllers.controller('menuController', ['$scope', '$location', 'caseService',
    function($scope, $location, Case) {
        $scope.menuitems = [
            {name: 'Fordele oppgaver', url:'#/distribute', cnt: Case.countByStep("distribute")},
            {name: 'Registrere reiseregning', url:'#/register', cnt: Case.countByStep('register')},
            {name: 'Vedtak', url:'#/decision', cnt: Case.countByStep('decision')},
            {name: 'Administrer', url: '', cnt: 0}
        ];
    }
]);

caseControllers.controller('loginController', ['$scope', '$rootScope', '$location', 'AuthService',
    function($scope, $rootScope, $location, AuthService) {
        if (AuthService.isAuthenticated()) {
            $scope.currentUser = User.currentUser;
        }

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
