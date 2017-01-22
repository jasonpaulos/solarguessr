var app = angular.module('solarguessr');

app.controller('NavController', ['$scope', 'account',
	function ($scope, account) {
		$scope.account = account;
	}
]);
