(function () {
	"use strict";

	angular
		.module('app.order')
		.controller('DeliverymanOrderDetailsController', DeliverymanOrderDetailsController);

	DeliverymanOrderDetailsController.$inject = [
		'$state', '$stateParams','$ionicLoading',
		'OrderDeliveryman'
	];

	function DeliverymanOrderDetailsController(
		$state, $stateParams, $ionicLoading,
		OrderDeliveryman
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
			OrderDeliveryman.get({
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