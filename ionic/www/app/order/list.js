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
			var items = [{name:'Delete'}, {name:'teste'}, {name: 'hahaha'}];
			$mdBottomSheet.show({
		      template: '<md-bottom-sheet class="md-grid" layout="column">  <div layout="row" layout-align="center center" ng-cloak>    <h4>Since <code>clickOutsideToClose = false</code>, drag down or press ESC to close</h4>  </div>  <div ng-cloak>    <md-list flex layout="row" layout-align="center center">      <md-list-item ng-repeat="item in items">        <div>          <md-button class="md-grid-item-content" ng-click="listItemClick($index)">            <md-icon md-svg-src="{{item.icon}}"></md-icon>            <div class="md-grid-text"> {{ item.name }} </div>          </md-button>        </div>      </md-list-item>    </md-list>  </div></md-bottom-sheet>		      ',
		      
		    }).then(function(clickedItem) {
		      $scope.alert = clickedItem['name'] + ' clicked!';
		    });
		/*			
			var hideSheet = $ionicActionSheet.show({
			  buttons: [
			    { text: 'Detalhes' },
			    { text: 'Ver entrega' }
			  ],
			  destructiveText: 'Delete',
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
			  			
			  			break;
			  	}
			  }
			});
			*/
		}
	};
})();