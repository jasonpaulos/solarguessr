var app = angular.module('solarguessr');

app.controller('NavController', ['$scope', '$route', 'account',
	function ($scope, $route, account) {
		$scope.account = account;
	}
]);
