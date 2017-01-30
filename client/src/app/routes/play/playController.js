var app = angular.module('solarguessr');

app.controller('PlayController', ['$scope', 'modals', 'planets', 'score',
	function ($scope, modals, planets, score) {
		var actualLocation = {
			planet: null,
			location: {
				lon: null,
				lat: null
			}
		};
		
		actualLocation.planet = planets[Math.floor(Math.random() * planets.length)];
		
		var imageryProvider = Cesium.createTileMapServiceImageryProvider({
			url: actualLocation.planet.url,
			fileExtension: 'jpg'
		});
		
		var viewer = new Cesium.Viewer('cesiumContainer', {
			animation: false,
			baseLayerPicker: false,
			fullscreenButton: false,
			vrButton: false,
			geocoder: false,
			homeButton: false,
			infoBox: false,
			sceneModePicker: false,
			selectionIndicator: false,
			timeline: false,
			navigationHelpButton: false,
			navigationInstructionsInitiallyVisible: false,
			scene3DOnly: true,
			skyAtmosphere: false,
			imageryProvider: imageryProvider
		});
		
		var scene = viewer.scene;
		scene.screenSpaceCameraController.enableRotate = false;
		scene.screenSpaceCameraController.enableTranslate = false;
		scene.screenSpaceCameraController.enableZoom = false;
		scene.screenSpaceCameraController.enableTilt = false;
		scene.screenSpaceCameraController.enableLook = false;
		
		function getRandomArbitrary(min, max) {
			return Math.random() * (max - min) + min;
		}
		
		var camera = viewer.camera;
		
		actualLocation.location.lon = getRandomArbitrary(-180.0, 180.0);
		actualLocation.location.lat = 180.0 / Cesium.Math.PI * Math.acos(getRandomArbitrary(-1.0, 1.0));
		var height = 500000.0;
		var heading = getRandomArbitrary(0, 2*Cesium.Math.PI);
		
		camera.setView({
			destination: Cesium.Cartesian3.fromDegrees(actualLocation.location.lon, actualLocation.location.lat, height),
			orientation: {
				heading: heading,
				pitch: -Cesium.Math.PI_OVER_TWO,
				roll: 0.0
			}
		});
		
		var canvas = viewer.canvas;
		canvas.setAttribute('tabindex', '0');
		canvas.onclick = function () {
			canvas.focus();
		};
		
		var looking = false;
		var startMousePosition;
		var mousePosition;
		
		var handler = new Cesium.ScreenSpaceEventHandler(canvas);
		
		handler.setInputAction(function (movement) {
			looking = true;
			mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
		}, Cesium.ScreenSpaceEventType.LEFT_DOWN);
		
		handler.setInputAction(function (movement) {
			mousePosition = movement.endPosition;
		}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		
		handler.setInputAction(function (movement) {
			looking = false;
		}, Cesium.ScreenSpaceEventType.LEFT_UP);
		
		viewer.clock.onTick.addEventListener(function (clock) {
			if (looking) {
				var width = canvas.clientWidth;
				var height = canvas.clientHeight;
				
				var frustum = camera.frustum;
				var fovy = frustum.fovy;
				
				//Equation from https://www.opengl.org/discussion_boards/showthread.php/168009-How-to-get-the-horizontal-fov
				var fovx = 2.0 * Math.atan(frustum.aspectRatio * Math.tan(fovy / 2.0)); 
				
				var x = -(mousePosition.x - startMousePosition.x) / width * fovx;
				var y = (mousePosition.y - startMousePosition.y) / height * fovy;
				
				startMousePosition.x = mousePosition.x;
				startMousePosition.y = mousePosition.y;
				
				var lookFactor = 1;
				camera.lookRight(x * lookFactor);
				camera.lookUp(y * lookFactor);
			}
		});
		
		$scope.makeGuess = function () {
			var params = {
				options: planets,
				guess: {
					planet: null,
					location: null
				},
				styleLocation: null,
				selectLocation: function (event) {
					var offsetX = event.offsetX;
					var offsetY = event.offsetY;
					
					var lon = 360.0 * (offsetX / event.target.clientWidth) - 180.0;
					var lat = 180.0 / Cesium.Math.PI * Math.acos(2.0 * offsetY / event.target.clientHeight - 1.0) - 90.0;
					
					this.guess.location = {
						lon: lon,
						lat: lat
					};
					
					offsetX -= 15; //.guess-pin width/2
					offsetY -= 43; // guess-pin height
					this.styleLocation = {
						top: offsetY + 'px',
						left: offsetX + 'px'
					};
				}
			};
			
			return modals.open('guess', params)
				.then(function (guess) {
					console.log(JSON.stringify(score.calculateScore(actualLocation, guess)));
				}, function () {
					
				});
		};
	}
]);
