var caseControllers = angular.module('caseControllers', ['ui.utils']);

caseControllers.controller('casesController', ['$scope', '$location', 'caseService',
    function($scope, $location, Case) {
        $scope.cases = Case.getCases();

        $scope.view_case = function(caze) {
            $location.path('view/' + caze.caseid);
        };
    }
]);

caseControllers.controller('distributeController', ['$scope', 'caseService', '$location', '$state',
    function($scope, Case, $location, $state) {
        $scope.title = $state.current.data.title;

        $scope.cases = Case.getCasesByStep($state.current.data.step);

        $scope.getCases = function() {
            return Case.getCasesByStep($state.current.data.step);
        };
        
        $scope.getNextCase = function () {
            caze = $scope.cases.shift();
            console.log("Getting next case" + caze.caseid);
            $location.path('view/' + caze.caseid);
        };

        $scope.someCallback = function($event) {
            alert("FOOOOO");
            $event.preventDefault();
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

caseControllers.controller('menuController', ['$scope', '$location', 'userService', 'caseService',
    function($scope, $location, User, Case) {
        $scope.menuitems = [
            {name: 'Fordele oppgaver', url:'#/distribute', cnt: Case.countByStep("distribute")},
            {name: 'Registrere reiseregning', url:'#/register', cnt: Case.countByStep('register')},
            {name: 'Vedtak', url:'#/decision', cnt: Case.countByStep('decision')},
            {name: 'Administrer', url: '', cnt: 0}
        ];
    }
]);

caseControllers.controller('loginController', ['$scope', '$rootScope', '$location', 'userService',
    function($scope, $rootScope, $location, User) {
        if (User.isLoggedIn()) {
            $scope.currentUser = User.currentUser;
        }

        $scope.login = function() {
            User.login($scope.username, $scope.pwd);
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

caseControllers.factory('userService', ['$rootScope', function($rootScope) {
    User = {
        currentUser: undefined,
        users: [
            {uname: 'dagt', name: 'Dag Øyvind', role: 'admin', pwd: 'god'},
            {uname: 'testt', name: 'Test Testersen', role: 'user', pwd: 'password'}
        ],
    };
    
    User.logout = function() {
        User.currentUser = undefined;
        $rootScope.$broadcast('Logout');
    };
    
    User.login = function(user, password) {
        for (var i = 0; i < User.users.length; ++i) {
            if (User.users[i].uname == user && User.users[i].pwd == password) {
                User.currentUser = User.users[i];
                $rootScope.$broadcast('Login');
                return;
            }
        }
        // No such user..
        User.currentUser = undefined;
        $rootScope.$broadcast('LoginFailed');
    };

    User.isLoggedIn = function() {
        return User.currentUser !== undefined;
    };
    
    User.currentUser = User.users[0];
    $rootScope.$broadcast('Login');

    return User;
}]);
