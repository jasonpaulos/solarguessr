var app = angular.module('solarguessr');

app.controller('HomeController', ['$scope', 'score',
	function ($scope, score) {
		$scope.leaderboard = score.getLeaderboard({
			limit: 10,
			sort: 'score',
			sortDir: -1
		});
	}
]);
