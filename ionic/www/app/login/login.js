(function () {
	"use strict";

	angular
		.module('app.login')
		.controller('LoginController', LoginController);

	LoginController.$inject = [
		'$ionicPopup',
		'$cordovaTouchID', '$cordovaKeychain',
		'$auth'
	];

	function LoginController(
		$ionicPopup,
		$cordovaTouchID, $cordovaKeychain,
		$auth
	){
		var vm            = this;
		vm.supportTouchID = false;
		vm.login          = login;
		vm.loginTouchID   = loginTouchID;



		//------------------------------
		vm.user = {
			username: '',
			password: ''
		};


		activate();



		function activate(){
			if(ionic.Platform.isWebView() && ionic.Platform.isIOS() && ionic.Platform.isIPad()){
				$cordovaTouchID.checkSupport().then(
					function(){
						vm.supportTouchID = true;
					}
				);
			}
		}

  
		//------------------------------
		function login(){
			$auth.login(vm.user);		
		}

		function loginTouchID(){
			if(vm.supportTouchID){				
				$cordovaTouchID.authenticate("Autenticação com a Digital").then(function() {
					var keyChain = $cordovaKeychain.getForKey('username', 'delivery_ionic');
					keyChain
						.then(function(username){
							vm.user.username = username;
							return $cordovaKeychain.getForKey('password', 'delivery_ionic');
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