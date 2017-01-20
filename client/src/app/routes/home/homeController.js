var app = angular.module('solarguessr');

app.controller('HomeController', ['$scope', 'modals',
	function ($scope, modals) {
		$scope.alertSomething = function () {
			modals.open('alert', {
				message: 'Alert modal'
			})
			.then(function handleResolve(response) {
				console.log('Alert resolved.');
			})
			.catch(function handleReject(error) {
				console.warn('Alert rejected!');
			});
		};
		
		$scope.confirmSomething = function() {
			modals.open('confirm', {
				message: 'Confirm modal'
			})
			.then(function handleResolve(response) {
				console.log('Confirm resolved.');
			})
			.catch(function handleReject(error) {
				console.warn('Confirm rejected!');
			});
		};
		
		$scope.promptSomething = function() {
			modals.open('prompt', {
				message: 'Prompt modal',
				placeholder: 'Placeholder'
			})
			.then(function handleResolve(response) {
				console.log('Prompt resolved with %s', response);
			})
			.catch(function handleReject(error) {
				console.warn('Prompt rejected!');
			});
		};
	}
]);
