(function () {
	"use strict";

	angular
		.module('app.product')
		.controller('ProductListController', ProductListController);

	ProductListController.$inject = [
		'$resource', 
		'$state', '$ionicLoading',
		'$localStorage', '$cart', 'Product'
	];

	function ProductListController(
		$resource,
		$state, $ionicLoading,
		$localStorage, $cart, Product
	){
		var vm          = this;
		vm.products     = [];
		vm.activate     = activate;
		vm.query        = query;
		vm.addCart      = addCart;
		vm.details      = details;
		vm.checkoutList = checkoutList;

		activate();


		//------------------------------
		function activate(){			
			$ionicLoading.show({
				template: 'Carregando'
			});
			vm.products = query();
		}

		function query(){
			Product.query({}, 
				function(data){
					vm.products = data.data;
					$ionicLoading.hide();
				},
				function(){
					$ionicLoading.hide();
				}
			);
		}

		function addCart(product){
			product.quantity = 1;
			$cart.addItem(product);
			$state.go('checkout.list');
		}

		function details(product) {
			$state.go('products.details', {id: product.id});
		}

		function checkoutList(){
			$state.go('checkout.list');
		}
	};
})();