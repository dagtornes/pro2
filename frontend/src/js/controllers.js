var caseControllers = angular.module('caseControllers', ['restangular', 'Auth', 'SelectPerson', 'SelectAddress']);

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
