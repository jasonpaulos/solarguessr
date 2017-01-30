var app = angular.module('solarguessr');

app.service('score', ['$http', 'planets',
	function ($http, planets) {
		
		function calculateScore(actual, guess) {
			var systemScore = calculateSystemScore(actual.planet, guess.planet);
			var planetScore = 0.0;
			
			if (actual.planet.name === guess.planet.name) {
				planetScore = Math.min(10000.0, 1e9 / surfaceDistance(actual.location, guess.location, actual.planet.radius));
			}
			
			return {
				systemScore: systemScore,
				planetScore: planetScore
			};
		}
		
		function calculateSystemScore(actualPlanet, guessPlanet) {
			if (actualPlanet.system.index === guessPlanet.system.index) {
				return 1000.0;
			}
			
			return 500.0 / Math.abs(actualPlanet.system.index - guessPlanet.system.index);
		}
		
		function surfaceDistance(a, b, radius) {
			function deg2rad(angle) {
				return angle / 180.0 * Cesium.Math.PI;
			}
			
			var latA = deg2rad(a.lat);
			var lonA = deg2rad(a.lon);
			var latB = deg2rad(b.lat);
			var lonB = deg2rad(b.lon);
			
			var sinLatA = Math.sin(latA);
			var cosLatA = Math.cos(latA);
			var sinLonA = Math.sin(lonA);
			var cosLonA = Math.cos(lonA);
			var sinLatB = Math.sin(latB);
			var cosLatB = Math.cos(latB);
			var sinLonB = Math.sin(lonB);
			var cosLonB = Math.cos(lonB);
			
			//Equation from http://www8.nau.edu/cvm/latlon_formula.html
			return (Math.acos(
						cosLatA*cosLonA*cosLatB*cosLonB +
						cosLatA*sinLonA*cosLatB*sinLonB +
						sinLatA*sinLatB
					)* radius);
		}
		
		return {
			calculateScore: calculateScore
		};
	}
]);
