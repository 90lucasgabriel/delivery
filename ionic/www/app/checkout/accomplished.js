(function () {
	"use strict";

	angular
		.module('app.checkout')
		.controller('CheckoutAccomplishedController', CheckoutAccomplishedController);

	CheckoutAccomplishedController.$inject = [
		'$state',
		'$cart'
	];

	function CheckoutAccomplishedController(
		$state,
		$cart
	){
		var vm              = this;
		var cart;
		vm.activate         = activate;
		vm.productDetails   = productDetails;


		//------------------------------
		activate();


		//------------------------------
		function activate(){			
			cart = $cart.get();
			vm.items = cart.items;
			vm.total = cart.total;
			$cart.clear();
		}

		function productDetails(item) {
			var index = vm.items.indexOf(item);
			$state.go('products.details', {id: item.id})
		}

	};
})();