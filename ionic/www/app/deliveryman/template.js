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
				template: '<md-progress-circular md-mode="indeterminate" class="md-accent"></md-progress-circular>'
			});		
			vm.user = userGet();
			$ionicLoading.hide();
		}

		function userGet(){
			return UserService.getObject();
		}
	};
})();