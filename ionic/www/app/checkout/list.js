(function () {
	"use strict";

	angular
		.module('app.checkout')
		.controller('CheckoutListController', CheckoutListController);

	CheckoutListController.$inject = [
		'$state', '$ionicLoading', '$ionicPopup',
		'$cart', 'Order'
	];

	function CheckoutListController(
		$state, $ionicLoading, $ionicPopup,
		$cart, Order
	){
		var vm              = this;
		var cart;
		vm.activate         = activate;
		vm.remove			= remove;
		vm.productList		= productList;
		vm.productDetails	= productDetails;
		vm.saveOrder        = saveOrder;


		//------------------------------
		activate();


		//------------------------------
		function activate(){			
			cart = $cart.get();
			vm.items = cart.items;
			vm.total = cart.total;
		}

		function remove(item){
			$cart.removeItem(item);
			vm.items.splice(vm.items.indexOf(item), 1);
			vm.total = $cart.get().total;
		}

		function productList(){
			$state.go('products.list');
		}

		function productDetails(item) {
			var index = vm.items.indexOf(item);
			$state.go('products.details', {id: item.id})
		}

		function saveOrder(items){
			$ionicLoading.show({
				template: 'Carregando'
			});

			var i = angular.copy(items);
			console.log(i);
			angular.forEach(i, function(item){
				item.product_id = item.id;
			});

			Order.save({items: i})
				.$promise
				.then(
					function(data){
						$ionicLoading.hide();
						$state.go("checkout.accomplished");
					},
					function(response){
						$ionicLoading.hide();
						$ionicPopup.alert({
							title: 'Pedido',
							template: 'Erro no Pedido. Tente novamente.'
						});
					}
				);
		}
	};
})();