var app = angular.module('solarguessr');

app.service('account', ['modals',
	function (modals) {
		
		function login() {
			modals.open('login')
				.then(function () {
					console.log('resolved');
				}, function () {
					console.log('rejected');
				});
		};
		
		return {
			login: login
		};
	}
]);
