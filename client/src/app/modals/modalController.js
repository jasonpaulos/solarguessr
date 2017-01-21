var app = angular.module('solarguessr');

app.controller('ModalController', ['$scope', 'modals',
	function ($scope, modals) {
		$scope.cancel = modals.reject;
		$scope.confirm = modals.resolve;
		$scope.params = modals.params;
	}
]);
