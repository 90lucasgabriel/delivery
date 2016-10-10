(function () {
	"use strict";

	angular
		.module('app.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = [
		'$state',
		'$ionicPopup', '$ionicLoading', 'OAuth', 'OAuthToken',
		'UserService', 'User'
	];

	function LoginController(
		$state,
		$ionicPopup, $ionicLoading, OAuth, OAuthToken,
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
			$ionicLoading.show({
				template: '<md-progress-circular md-mode="indeterminate" class="md-accent"></md-progress-circular>'
			});

			var token    = OAuth.getAccessToken(vm.user);
			
			token				
				.then(function(tokenData){
					return User.authenticated({include: 'client'}).$promise;
				})
				.then(
					function(userData){
						UserService.setObject(userData.data);
						if(userData.data.role=='deliveryman'){
							$state.go('deliveryman.orders.list');
						}
						else{
							$state.go('client.products.list');	
						}
						$ionicLoading.hide();
					},
					function(response){
						UserService.setObject(null);	
						OAuthToken.removeToken();
						$ionicPopup.alert({
							title: 'Autenticação',
							template: 'Login e/ou Senha inválidos.'
						});
						$ionicLoading.hide();
					}
				);			
		}
	};
})();