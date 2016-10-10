(function () {
	"use strict";

	angular
		.module('app.checkout')
		.controller('CheckoutListController', CheckoutListController);

	CheckoutListController.$inject = [
		'$state', '$ionicLoading', '$ionicPopup', '$cordovaBarcodeScanner',
		'$cart', 'Order', 'Coupon', 'User'
	];

	function CheckoutListController(
		$state, $ionicLoading, $ionicPopup, $cordovaBarcodeScanner,
		$cart, Order, Coupon, User
	){
		var vm            = this;
		var cart;
		vm.activate       = activate;
		vm.remove         = remove;
		vm.barcodeRead    = barcodeRead;
		vm.couponRemove   = couponRemove;
		vm.productList    = productList;
		vm.productDetails = productDetails;
		vm.orderSave      = orderSave;


		//Init ------------------------------------
		activate();


		//This model ------------------------------
		function activate(){			
			cart      = $cart.get();
			vm.coupon = cart.coupon;
			vm.items  = cart.items;
			vm.total  = $cart.getTotal();
		}

		function remove(item){
			$cart.removeItem(item);
			vm.items.splice(vm.items.indexOf(item), 1);
			vm.total = $cart.getTotal();
		}



		//Others models ----------------------------
		function barcodeRead(){
			$cordovaBarcodeScanner
				.scan()
				.then(
					function(data) {
						getCoupon(data.text);
					},
					function(error) {
						$ionicLoading.hide();
						$ionicPopup.alert({
							title: 'Erro',
							template: 'Erro ao ler código de barras. Tente novamente.'
						});
					}
				);			
		}

		function couponRemove(){
			$cart.removeCoupon();
			vm.coupon = $cart.get().coupon;
			vm.total = $cart.getTotal();
		}

		function productList(){
			$state.go('client.products.list');
		}

		function productDetails(item) {
			var index = vm.items.indexOf(item);
			$state.go('client.products.details', {id: item.id})
		}

		function orderSave(items){
			$ionicLoading.show({
				template: '<md-progress-circular md-mode="indeterminate" class="md-accent"></md-progress-circular>'
			});

			var i = {items: angular.copy(items)};
			angular.forEach(i.items, function(item){
				item.product_id = item.id;
			});

			if(vm.coupon.value){
				i.coupon_code = vm.coupon.code;
			}

			Order.save(i)
				.$promise
				.then(
					function(data){
						$ionicLoading.hide();
						$state.go("client.checkout.accomplished");
					},
					function(response){
						$ionicLoading.hide();
						$ionicPopup.alert({
							title: 'Erro',
							template: 'Erro no Pedido. Tente novamente.'
						});
					}
				);
		}


		//Private functions ----------------------
		function getCoupon(code){
			$ionicLoading.show({
				template: '<md-progress-circular md-mode="indeterminate" class="md-accent"></md-progress-circular>'
			});

			Coupon.getByCode({code: code})
				.$promise
				.then(
					function(data){
						$cart.setCoupon(data.data.code, data.data.value);
						vm.coupon = $cart.get().coupon;
						vm.total  = $cart.getTotal();
						$ionicLoading.hide();
					},
					function(response){
						$ionicLoading.hide();
						$ionicPopup.alert({
							title: 'Erro',
							template: 'Cupom inválido.'
						});
					}
				);
		}
	};
})();