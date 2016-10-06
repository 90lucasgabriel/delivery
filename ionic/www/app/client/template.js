(function () {
	"use strict";

	angular
		.module('app.client')
		.controller('ClientMenuController', ClientMenuController);

	ClientMenuController.$inject = [
		'$ionicLoading',
		'UserService'
	];

	function ClientMenuController(
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