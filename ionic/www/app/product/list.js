(function () {
	"use strict";

	angular
		.module('app.product')
		.controller('ProductListController', ProductListController);

	ProductListController.$inject = [
		'$scope', '$resource', 
		'$state', '$ionicLoading',
		'$localStorage', '$cart', 'Product'
	];

	function ProductListController(
		$scope, $resource,
		$state, $ionicLoading,
		$localStorage, $cart, Product
	){
		var vm          = this;
		var page        = 1;
		vm.loadMore     = true;
		vm.products     = [];
		vm.activate     = activate;
		vm.queryAll     = queryAll;
		vm.query        = query;
		vm.addCart      = addCart;
		vm.details      = details;
		vm.checkoutList = checkoutList;

		activate();


		//------------------------------
		function activate(){
			
		}

		function queryPromise(){
			return 	Product.query({
						page: page
					}).$promise;
		}

		function query(){
			queryPromise().
				then(
					function(data){
						vm.products = vm.products.concat(data.data);
						if(vm.products.length == data.meta.pagination.total){
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
			$state.go('client.checkout.list');
		}

		function details(product) {
			$state.go('client.products.details', {id: product.id});
		}

		function checkoutList(){
			$state.go('client.checkout.list');
		}
	};
})();