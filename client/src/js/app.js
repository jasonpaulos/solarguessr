var app = angular.module('solarguessr', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '/js/routes/home/homeView.html',
				controller: 'HomeController'
			})
			.otherwise({ redirectTo: '/' });
		
		$locationProvider.html5Mode(true);
	}
]);
