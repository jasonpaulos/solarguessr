var app = angular.module('solarguessr');

app.controller('MainController', ['$scope', '$route',
	function ($scope, $route) {
		$scope.showNavigation = function () {
			if ($route && $route.current) {
				return $route.current.templateUrl !== '/app/routes/play/playView.html';
			}
			
			return true;
		};
	}
]);
