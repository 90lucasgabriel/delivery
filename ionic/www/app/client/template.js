(function () {
	"use strict";

	angular
		.module('app.client')
		.controller('ClientMenuController', ClientMenuController);

	ClientMenuController.$inject = [
		'$state', '$ionicLoading',
		'UserService'
	];

	function ClientMenuController(
		$state, $ionicLoading,
		UserService
	){
		var vm          = this;
		vm.user;
		vm.logout       = logout;
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

		function logout(){
			$state.go('logout');
		}

		function userGet(){
			return UserService.getObject();
		}
	};
})();