(function () {
	"use strict";

	angular
		.module('app.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = [
		'$state',
		'$ionicPopup', 'OAuth', 'OAuthToken',
		'UserService', 'User'
	];

	function LoginController(
		$state,
		$ionicPopup, OAuth, OAuthToken,
		UserService, User
	){
		var vm   = this;
		vm.login = login;


		//------------------------------
		vm.user = {
			username: '',
			password: ''
		};


		//------------------------------
		function login(){
			var token    = OAuth.getAccessToken(vm.user);
			
			token				
				.then(function(tokenData){
					return User.authenticated({include: 'client'}).$promise;
				})
				.then(
					function(userData){
						UserService.setObject(userData.data);		
						$state.go('client.products.list');
					},
					function(response){
						UserService.setObject(null);	
						OAuthToken.removeToken();
						$ionicPopup.alert({
							title: 'Autenticação',
							template: 'Login e/ou Senha inválidos.'
						});
					}
				);			
		}
	};
})();