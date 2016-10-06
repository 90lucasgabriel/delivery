(function () {
	"use strict";

	angular
		.module('app.deliveryman')
		.controller('DeliverymanMenuController', DeliverymanMenuController);

	DeliverymanMenuController.$inject = [
		'$ionicLoading',
		'UserService'
	];

	function DeliverymanMenuController(
		$ionicLoading,
		UserService
	){
		var vm          = this;
		vm.user;
		vm.activate     = activate;

		

		activate();


		//------------------------------
		function activate(){
			$ionicLoading.show({
				template: 'Carregando'
			});		
			vm.user = userGet();
			$ionicLoading.hide();
		}

		function userGet(){
			return UserService.getObject();
		}
	};
})();