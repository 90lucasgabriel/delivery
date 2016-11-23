(function () {
	"use strict";

	angular
		.module('app.login')
		.controller('TouchIDController', TouchIDController);

	TouchIDController.$inject = [
		'$ionicPopup',
		'$cordovaTouchID', 'OAuth',
		'$auth', 'UserService'
	];

	function TouchIDController(
		$ionicPopup,
		$cordovaTouchID, OAuth,
		$auth, UserService
	){
		var vm            = this;
		vm.supportTouchID = false;
		vm.login          = login;
		vm.loginTouchID   = loginTouchID;


		activate();


		//------------------------------
		function activate(){
			if(ionic.Platform.isWebView() && ionic.Platform.isIOS() && ionic.Platform.isIPad()){
				$cordovaTouchID.checkSupport().then(
					function(){
						vm.supportTouchID = true;
					}
				);
			}
		}

		function login(){
			vm.user.username = UserService.getObject().email;
			var token = OAuth.getAccessToken(vm.user)

			token
				.then(function(){
					return Keychain.set('username', 'delivery_ionic', vm.user.username);
				})
				.then(function(password){
					vm.user.password = password;
					return Keychain.set('password', 'delivery_ionic', vm.user.password);
				})
				.then(function(){
					$ionicPopup.alert({
		              title: 'TouchID',
		              template: 'TouchID Habilitado'
		            });
				},
					function(){
						$ionicPopup.alert({
			              title: 'Autenticação',
			              template: 'Login e/ou Senha inválidos.'
			            });
					}
				);
		}

		function loginTouchID(){
			if(vm.supportTouchID){				
				$cordovaTouchID.authenticate("Autenticação com a Digital").then(function() {
					var keyChain = $cordovaKeychain.get('username', 'delivery_ionic');
					keyChain
						.then(function(username){
							vm.user.username = username;
							return $cordovaKeychain.get('password', 'delivery_ionic');
						})
						.then(function(password){
							vm.user.password = password;
							$auth.login(vm.user);
						},
							function(response){
								$ionicPopup.alert({
					              title: 'Autenticação',
					              template: 'Login e/ou Senha inválidos.'
					            });
							}

						);
					
				}, function () {
					// error
				});
			}
		}
	};
})();