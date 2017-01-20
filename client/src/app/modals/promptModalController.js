var app = angular.module('solarguessr');

app.controller('PromptModalController', ['$scope', 'modals',
	function ($scope, modals) {
		$scope.message = ( modals.params().message || "Give me." );
		
		$scope.form = {
			input: ( modals.params().placeholder || "" )
		};
		
		$scope.catchMessage = null;
		
		$scope.cancel = modals.reject;
		$scope.submit = function() {
			if (!$scope.form.input) {
				return ($scope.catchMessage = 'Please provide something!');
			}
			
			modals.resolve( $scope.form.input );
		};
	}
]);
