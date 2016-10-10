(function () {
	"use strict";

	angular
		.module('app.order')
		.controller('DeliverymanOrderListController', DeliverymanOrderListController);

	DeliverymanOrderListController.$inject = [
		'$scope', '$resource', 
		'$state', '$ionicLoading',
		'OrderDeliveryman'
	];

	function DeliverymanOrderListController(
		$scope, $resource,
		$state, $ionicLoading,
		OrderDeliveryman
	){
		var vm          = this;
		vm.orders       = [];
		vm.activate     = activate;
		vm.query        = query;

		activate();


		//------------------------------
		function activate(){			
			$ionicLoading.show({
				template: '<md-progress-circular md-mode="indeterminate" class="md-accent"></md-progress-circular>'
			});
			vm.orders = query();
		}

		function query(){
			OrderDeliveryman.query({
				orderBy  : 'created_at',
				sortedBy : 'desc'
				})
				.$promise
				.then( 
					function(data){
						vm.orders = data.data;
						$ionicLoading.hide();
						$scope.$broadcast('scroll.refreshComplete');
					},
					function(){
						$ionicLoading.hide();
						$scope.$broadcast('scroll.refreshComplete');
					}
				);
		}
	};
})();