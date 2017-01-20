var app = angular.module('solarguessr');

app.controller('ConfirmModalController', ['$scope', 'modals',
	function ($scope, modals) {
		var params = modals.params();
		
		$scope.message = ( params.message || "Are you sure?" );
		$scope.confirmButton = ( params.confirmButton || "Yes!" );
		$scope.denyButton = ( params.denyButton || "Oh, hell no!" );
		
		$scope.confirm = modals.resolve;
		$scope.deny = modals.reject;
	}
]);
