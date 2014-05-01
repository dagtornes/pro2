angular.module('Auth', [])

.factory('AuthService', ['$http', 'Session', function($http, Session) {
    return {
        login: function (username, password) {
            var encoded = btoa(username + ':' + password);
            $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
            return $http
                .get('http://localhost:8000/api/users/by_name/' + username + '/')
                .success(function(data) {
                    console.log(data);
                });
        },
        logout: function () {
            $http.defaults.headers.common.Authorization = 'Basic ';
        },
        isAuthenticated: function () {
            return !!Session.userId;
        }
    };
}])

.service('Session', function () {
    this.create = function (sessionId, userId, role) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.role = role;
    };

    this.destroy = function () {
        this.sessionId = null;
        this.userId = null;
        this.role = null;
    };
});
