angular.module('journeyServices', ['restangular'])

.factory('addressService', ['Restangular', '$q', function(Restangular, $q) {
    function get(id) {
        var addr_p = $q.defer();
        Restangular.one('address', id).get().then(function (a) {
            addr_p.resolve(_.pick(a, 'id', 'number', 'street', 'subnum', 'postid'));
        });
        return addr_p.promise;
    }

    function getMany(ids) {
        return $q.all(_.map(ids, function(id) {
            get(id);
        }));
    }

    return {
        get: get,
        getMany: getMany
    };
}])

.factory('journeyService', ['Restangular', '$q', 'addressService',
        function(Restangular, $q, Addresses) {
    function get(id) {
        var journey_p = $q.defer(),
            journey = {};

        Restangular.one('journeys', id).get().then(function(j) {
            journey.id = j.id;
            return j;
        }).then(function (j) {
            Addresses.getMany([j.departure, j.destination])
            .then(function (addrs) {
                journey.departure = addrs[0];
                journey.destination = addrs[1];
                journey_p.resolve(journey);
            });
        });
        return journey_p.promise;
    }

    function getMore(ids) {
        return $q.all(_.map(ids, function(id) {
            return get(id);
        })).promise;
    }

    function create(journey) {
        var journey_p = $q.defer();
        Restangular.all('journeys').post(journey).then(function(j) {
            journey_p.resolve({
                id: j.id
            });
        });
        return journey_p.promise;
    }

    function update(journey) {
        journey_p = $q.defer();
        Restangular.one('journeys', journey.id).patch(journey).then(function(j) {
            journey_p.resolve({
                id: j.id
            });
        });
        return journey_p.promise;
    }

    function save(journey) {
        return !!journey.id ? update(journey) : create(journey);
    }

    return {
        get: get,
        getMore: getMore,
        save: save
    };
}]);
