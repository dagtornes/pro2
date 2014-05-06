angular.module('caseServices', ['restangular'])

.factory('caseService', ['Restangular', function(Restangular) {
    var cases = Restangular.all('cases');

    service = {};

    service.getCasesFromBE = function() {
        return cases.getList();
    };

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
        return service.cases[0];
    };

    service.hasNextCase = function() {
        return service.cases.length !== 0;
    };

    service.getCaseById = function(id) {
        var caze = Restangular.one('cases', id);
        return caze.get();
    };

    service.next_step = function(caze) {
        switch (caze.step) {
            case 'distribute':
                return 'register';
            case 'register':
                return 'decision';
            case 'decision':
                return 'completed';
        }
    };

	service.prev_step = function(caze) {
		switch (caze.step) {
			case 'register':
				return 'distribute';
			case 'decision':
				return 'register';
			case 'completed':
				return 'decision';
		}
	};

    service.advance = function(caze) {
        caze.step = service.next_step(caze);
        return caze;
    };

	service.prev = function(caze) {
		caze.step = service.prev_step(caze);
		return caze;
	};

    return service;
}])

.factory('ProcessService', ['Restangular', function(Restangular) {
    var service = {};

    Restangular.all('process_step').getList()
        .then(function(process_steps) {
            service.process_steps = process_steps;
            console.log(process_steps);
        });

    service.byId = function(id) {
        return service.process_steps.filter(function(step) {return step.id === id;})[0];
    };

    service.byName = function(name) {
        return service.process_steps.filter(function(step) {return step.name == name;})[0];
    };

    return service;
}]);

