describe ('Pro2AppController', function() {
	beforeEach(module('pro2app'));

	it('should find the current user', inject(function($controller) {
		var scope = {};
		var ctrl = $controller('Pro2AppController', {$scope: scope});

		expect(scope.currentUser.role).toBe('admin');
	}));
});