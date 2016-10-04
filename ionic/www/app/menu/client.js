(function () {
	"use strict";

	angular
		.module('app.menu')
		.controller('ClientMenuController', ClientMenuController);

	ClientMenuController.$inject = [
		'$ionicLoading',
		'User'
	];

	function ClientMenuController(
		$ionicLoading,
		User
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
			authenticated();
		}

		function authenticated(){
			User.authenticated()
				.$promise
				.then(
					function(data){
						vm.user = data.data;
						$ionicLoading.hide();
					},
					function(response){
						console.log(reponse);
						$ionicLoading.hide();
					}
				);

		}
	};
})();