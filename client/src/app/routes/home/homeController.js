var app = angular.module('solarguessr');

app.controller('HomeController', ['$scope', 'score', 'account',
	function ($scope, score, account) {
		$scope.leaderboard = [];
		$scope.opts = {
			limit: 10,
			sort: 'score',
			ascending: false,
			friendsOnly: false
		};
		
		$scope.optsChanged = function (shouldBeLoggedIn) {
			if (shouldBeLoggedIn && !account.isSignedIn()) {
				return account.login().then(function () {
					$scope.opts.friendsOnly = false;
					$scope.optsChanged();
				});
			}
			
			$scope.opts.sortDir = $scope.opts.ascending ? 1 : -1;
			$scope.opts.friends = $scope.opts.friendsOnly ? 1 : 0;
			score.getLeaderboard($scope.opts).then(function (res) {
                        	$scope.leaderboard = res.data;
                	});
		};
		
		$scope.optsChanged();
	}
]);
