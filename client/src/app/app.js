var app = angular.module('solarguessr', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '/app/routes/home/homeView.html',
				controller: 'HomeController'
			})
			.when('/play', {
				templateUrl: '/app/routes/play/playView.html',
				controller: 'PlayController'
			})
			.otherwise({ redirectTo: '/' });
		
		$locationProvider.html5Mode(true);
	}
]);
