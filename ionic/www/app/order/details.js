(function () {
	"use strict";

	angular
		.module('app.order')
		.controller('OrderDetailsController', OrderDetailsController);

	OrderDetailsController.$inject = [
		'$state', '$stateParams','$ionicLoading',
		'Order'
	];

	function OrderDetailsController(
		$state, $stateParams, $ionicLoading,
		Order
	){
		var vm              = this;
		vm.order;
		vm.activate         = activate;
		vm.get		        = get;

		activate();


		//------------------------------
		function activate(){
			$ionicLoading.show({
				template: 'Carregando'
			});

			get();	
		}

		function get(){
			Order.get({
					id      : $stateParams.id,
					include : 'items,coupon'
				})
				.$promise
				.then( 
					function(data){
						vm.order = data.data;
						$ionicLoading.hide();
					},
					function(){
						$ionicLoading.hide();
					}
				);
		}

	};
})();