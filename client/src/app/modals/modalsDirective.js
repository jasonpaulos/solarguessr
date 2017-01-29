//Inspired by https://www.bennadel.com/blog/2806-creating-a-simple-modal-system-in-angularjs.htm

var app = angular.module('solarguessr');

app.directive('bnModals', ['$rootScope', 'modals',
	function ($rootScope, modals) {
		
		function link(scope, element, attributes) {
			scope.subview = null;
			
			element.on('click', function handleClickEvent(event) {
				if (element[0] !== event.target) {
					return;
				}
				
				scope.$apply(modals.reject);
			});
			
			$rootScope.$on('modals.open', function (event, modalType) {
				scope.subview = modalType;
			});
			
			$rootScope.$on('modals.close', function (event) {
				scope.subview = null;
			});
		}
		
		return link;
	}
]);
