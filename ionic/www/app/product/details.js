(function () {
	"use strict";

	angular
		.module('app.product')
		.controller('ProductDetailsController', ProductDetailsController);

	ProductDetailsController.$inject = [
		'$state', '$stateParams','$ionicLoading',
		'$localStorage', '$cart', 'Product'
	];

	function ProductDetailsController(
		$state, $stateParams, $ionicLoading,
		$localStorage, $cart, Product
	){
		var vm              = this;
		vm.product;
		vm.cart;
		vm.activate         = activate;
		vm.addOrUpdate		= addOrUpdate;
		vm.addCart			= addCart;
		vm.updateQuantity	= updateQuantity;

		activate();


		//------------------------------
		function activate(){
			$ionicLoading.show({
				template: '<md-progress-circular md-mode="indeterminate" class="md-accent"></md-progress-circular>'
			});

			vm.cart = $cart.get();

			addOrUpdate();	
		}

		function addOrUpdate(){
			//Verifica se já existe no carrinho;
			var item = $cart.getItemById($stateParams.id);
			if(item){
				vm.buttonAdd = false;
				vm.product = item;
				$ionicLoading.hide();
			}

			//Se não existir, pesquisar no banco de dados;
			else{
				vm.buttonAdd = true;
				Product.get(
					{id: $stateParams.id},
					function(data){
						vm.product = data.data;
						vm.product.quantity = 1;
						$ionicLoading.hide();
					},
					function(response){
						console.log('response', response);
						$ionicLoading.hide();
					}
				);
			}
		}

		function addCart(product){
			$cart.addItem(product);
			$state.go('client.checkout.list');
		}

		function updateQuantity(product, quantity){
			$cart.updateQuantity(product, quantity);
			$state.go('client.checkout.list');
		}
	};
})();