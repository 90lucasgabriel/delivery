(function () {
	"use strict";

	angular
		.module('app.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = [
		'$state',
		'$ionicPopup', 'OAuth'
	];

	function LoginController(
		$state,
		$ionicPopup, OAuth
	){
		var vm = this;
		vm.login = login;


		//------------------------------
		vm.user = {
			username: '',
			password: ''
		};


		//------------------------------
		function login(){
			OAuth.getAccessToken(vm.user).then(
				function(data){
					$state.go('products.list');
				}, 
				function(response){
					$ionicPopup.alert({
						title: 'Autenticação',
						template: 'Login e/ou Senha inválidos.'
					});
				}
			);
		}
	};
})();