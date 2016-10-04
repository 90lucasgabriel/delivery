(function () {
	"use strict";

	angular
		.module('app.order')
		.controller('OrderListController', OrderListController);

	OrderListController.$inject = [
		'$scope', '$resource', 
		'$state', '$ionicLoading',
		'Order'
	];

	function OrderListController(
		$scope, $resource,
		$state, $ionicLoading,
		Order
	){
		var vm          = this;
		vm.orders       = [];
		vm.activate     = activate;
		vm.query        = query;

		activate();


		//------------------------------
		function activate(){			
			$ionicLoading.show({
				template: 'Carregando'
			});
			vm.orders = query();
		}

		function query(){
			Order.query({
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