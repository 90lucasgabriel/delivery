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
		var page        = 1;
		vm.loadMore     = true;
		vm.orders       = [];
		vm.activate     = activate;
		vm.queryAll     = queryAll;
		vm.query        = query;
		vm.refresh      = refresh;
		vm.goDetails    = goDetails;
		vm.showOptions  = showOptions;

		activate();


		//------------------------------
		function activate(){			
			
		}

		function queryPromise(){
			return 	Order.query({
						page: page
					}).$promise;
		}

		function query(){
			queryPromise().
				then(
					function(data){
						vm.orders = vm.orders.concat(data.data);
						if(vm.orders.length == data.meta.pagination.total){
							vm.loadMore = false;
						}
						else{
							vm.loadMore = true;
							page++;	
						}
						$scope.$broadcast('scroll.infiniteScrollComplete');						
					}
				);	
		}

		function queryAll(){
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

		function refresh(){
			page 		= 1;
			vm.orders 	= [];
			vm.loadMore = true;
			vm.query();
			setTimeout(function() {
				$scope.$broadcast('scroll.refreshComplete');
			}, 200);
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