var app = angular.module('solarguessr');

app.controller('AlertModalController', ['$scope', 'modals',
	function ($scope, modals) {
		$scope.message = ( modals.params().message || "Whoa!" );
		
		$scope.close = modals.resolve;
		
		$scope.jumpToConfirm = function() {
			modals.proceedTo('confirm', {
				message: 'I just came from Alert - doesn\'t that blow your mind?',
				confirmButton: 'Confirm button',
				denyButton: 'Deny button'
			})
			.then(function () {
				console.log( "Piped confirm resolved." );
			})
			.catch(function () {
				console.warn( "Piped confirm rejected." );
			});
		};
	}
]);
