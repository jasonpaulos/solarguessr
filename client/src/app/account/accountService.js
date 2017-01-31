var app = angular.module('solarguessr');

app.service('account', ['$http', 'modals',
	function ($http, modals) {
		var data = {
			user: null,
			gettingUser: false
		};
		
		function login() {
			return modals.open('login')
				.then(function () {
					
				}, function () {
					
				});
		};
		
		function logout() {
			return $http.get('/logout')
				.then(function (res) {
					data.user = {};
				}, function (res) {
					console.error('Could not log out properly');
				});
		}
		
		function isSignedIn() {
			return data.user && !angular.equals(data.user, {});
		}
		
		function getUser() {
			if (!data.user && !data.gettingUser) {
				data.gettingUser = true;
				
				$http.get('/user')
					.then(function (res) {
						data.user = res.data;
						data.gettingUser = false;
					}, function (res) {
						console.error('Could not get user information');
					});
			}
			
			return data.user;
		}
		
		return {
			login: login,
			logout: logout,
			getUser: getUser,
			isSignedIn: isSignedIn
		};
	}
]);
