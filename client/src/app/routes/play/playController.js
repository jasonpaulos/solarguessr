var app = angular.module('solarguessr');

app.controller('PlayController', ['$scope',
	function ($scope) {
		var imageryProvider = Cesium.createTileMapServiceImageryProvider({
			url: '/cesium/Assets/Textures/NaturalEarthII',
			fileExtension: 'jpg'
		});
		
		var viewer = new Cesium.Viewer('cesiumContainer', {
			animation: false,
			baseLayerPicker: false,
			fullscreenButton: false,
			geocoder: false,
			homeButton: true,
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
	}
]);
