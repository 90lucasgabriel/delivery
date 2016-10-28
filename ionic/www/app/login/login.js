(function () {
	"use strict";

	angular
		.module('app.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = [
		'$state',
		'$ionicPopup', '$ionicLoading', 'OAuth', 'OAuthToken',
		'$localStorage', '$redirect', 'UserService', 'User'
	];

	function LoginController(
		$state,
		$ionicPopup, $ionicLoading, OAuth, OAuthToken,
		$localStorage, $redirect, UserService, User
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
				.then(function(data){
					var deviceToken = $localStorage.get('device_token');
					return User.updateDeviceToken(
						{}, 
						{device_token: deviceToken}
					).$promise;
				})			
				.then(function(tokenData){
					return User.authenticated({include: 'client'}).$promise;
				})
				.then(
					function(userData){
						UserService.setObject(userData.data);
						$redirect.redirectLogin();
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