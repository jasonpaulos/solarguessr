//Inspired by https://www.bennadel.com/blog/2806-creating-a-simple-modal-system-in-angularjs.htm

var app = angular.module('solarguessr');

app.controller('ModalController', ['$scope', 'modals',
	function ($scope, modals) {
		$scope.cancel = modals.reject;
		$scope.confirm = modals.resolve;
		$scope.params = modals.params;
	}
]);
