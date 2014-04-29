angular.module('Auth', [])

.factory('AuthService', ['$http', 'Session', function($http, Session) {
    return {
        login: function (credentials) {
            return $http
                .post('localhost:8000/auth/login/', credentials)
                .success(function(data) {
                    Session.create(data.sessionId, data.userId, data.role);
                });
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
