(function () {
	"use strict";

	angular
		.module('app.order')
		.controller('OrderMapButtonCenterController', OrderMapButtonCenterController);

	OrderMapButtonCenterController.$inject = [
		'$scope', '$mapOrder'
	];

	function OrderMapButtonCenterController(
		$scope, $mapOrder
	){
		$scope.map = $mapOrder;
		$scope.fit = fit;


		//------------------------------
		function fit(){
			$scope.map.fit = !$scope.map.fit;
		}
	};
})();