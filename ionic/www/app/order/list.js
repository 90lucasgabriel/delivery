(function () {
	"use strict";

	angular
		.module('app.order')
		.controller('OrderListController', OrderListController);

	OrderListController.$inject = [
		'$scope', '$resource', 
		'$state', '$ionicLoading', '$ionicActionSheet', '$mdBottomSheet',
		'Order'
	];

	function OrderListController(
		$scope, $resource,
		$state, $ionicLoading, $ionicActionSheet, $mdBottomSheet,
		Order
	){
		var vm          = this;
		vm.orders       = [];
		vm.activate     = activate;
		vm.query        = query;
		vm.goDetails    = goDetails;
		vm.showOptions  = showOptions;

		activate();


		//------------------------------
		function activate(){			
			$ionicLoading.show({
				template: '<md-progress-circular md-mode="indeterminate" class="md-accent"></md-progress-circular>'
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

		function goDetails(order){
			$state.go('client.orders.details', {id: order.id});
		}

		function showOptions(order){
			/*$mdBottomSheet.show({
		      templateUrl: '/app/common/templates/order-bottom-sheet.html',
		      controller: 'OrderBottomSheetController',
		      controllerAs: 'vm'
		      
		    }).then(function(clickedItem) {
		      $scope.alert = clickedItem['name'] + ' clicked!';
		    });
			*/	
			var hideSheet = $ionicActionSheet.show({
			  buttons: [
			    { text: 'Detalhes' },
			    { text: 'Rastreamento' }
			  ],
			  //destructiveText: 'Excluir',
			  titleText: 'Opções',
			  cancelText: 'Cancelar',
			  cancel: function() {
			    // add cancel code..
			  },
			  buttonClicked: function(index) {
			  	switch(index){
			  		case 0:
			  			$state.go('client.orders.details', {id: order.id});
			  			break;
			  		case 1:
			  			$state.go('client.orders.delivery', {id: order.id});
			  			break;
			  	}
			  }
			});
		}
	};
})();