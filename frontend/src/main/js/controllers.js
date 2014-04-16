var caseControllers = angular.module('caseControllers', []);

caseControllers.controller('casesController', ['$scope',
	function($scope) {
		$scope.cases = ['12345', '12346'];
	}
]);

caseControllers.controller('distributeController', ['$scope', 'caseService',
	function($scope, Case) {
		$scope.title = 'Fordele oppgaver';

		$scope.cases = Case.getCasesByStep("distribute");

		$scope.getNextCase = Case.getNextCase;
		$scope.hasNextCase = Case.hasNextCase;
	}
]);

caseControllers.controller('caseController', ['$scope', '$routeParams',
	function($scope, $routeParams) {
		$scope.caze = {
		 	caseId: $routeParams.caseId
		};
	}
]);

caseControllers.controller('navbarController', ['$scope', 'userService',
	function($scope, User) {
		$scope.logout = function() {
			User.logout();
			$scope.currentUser = User.currentUser;
		};
		
		$scope.$on('Login', function (event) {
			$scope.currentUser = User.currentUser;
		});

		$scope.$on('Logout', function (event) {
			$scope.currentUser = User.currentUser;
		});
	}
]);

caseControllers.controller('menuController', ['$scope', '$location', 'userService', 'caseService',
	function($scope, $location, User, Case) {
		$scope.menuitems = [
			{name: 'Fordele oppgaver', url:'#/distribute', cnt: Case.countByStep("distribute")},
			{name: 'Registrere reiseregning', url:'#/register', cnt: 2},
			{name: 'Vedtak', url:'#/decision', cnt: 1},
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

caseControllers.factory('caseService', function() {
	service = {};
	service.cases = [
		{caseid: 12345, owner: "dagt", office: "nasjonalt", step: "distribute"},
		{caseid: 12346, owner: "testt", office: "regionalt", step: "distribute"},
		{caseid: 12347, owner: "testt", office: "regionalt", step: "register"}
	];

	service.countByStep = function(step) {
		return service.cases.filter(function(caze) {
			return caze.step == step;
		}).length;
	};

	service.getCasesByStep = function(step) {
		return service.cases.filter(function(caze) {
			return caze.step == step;
		});
	};

	service.getCases = function() {
		return service.cases;
	};

	service.getNextCase = function() {
		return service.cases.shift();
	};

	service.hasNextCase = function() {
		return service.cases.length != 0;
	};

	return service;
});

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