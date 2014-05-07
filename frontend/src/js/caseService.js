angular.module('caseServices', ['restangular'])

.factory('caseService', ['Restangular', function(Restangular) {
    var cases = Restangular.all('cases');

    service = {};

    service.getCasesFromBE = function() {
        return cases.getList();
    };

    service.getByStep = function(cases, step) {
        return _.filter(cases, function(caze) {
            return caze.step === step;
        });
    };

    service.countByStep = function(cases, step) {
        return service.getByStep(cases, step).length;
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

    return service;
}])

.factory('ProcessService', ['Restangular', function(Restangular) {
    var service = {};

    Restangular.all('process_step').getList()
        .then(function(process_steps) {
            service.process_steps = process_steps;
        });

    service.byId = function(id) {
        return service.process_steps.filter(function(step) {return step.id === id;})[0];
    };

    service.byName = function(name) {
        return service.process_steps.filter(function(step) {return step.name == name;})[0];
    };

    return service;
}]);

