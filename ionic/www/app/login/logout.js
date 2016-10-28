(function () {
	"use strict";

	angular
		.module('app.login')
		.controller('LogoutController', LogoutController);

	LogoutController.$inject = [
		'$state',
		'$ionicPopup', '$ionicLoading', '$ionicHistory', 'OAuth', 'OAuthToken',
		'UserService'
	];

	function LogoutController(
		$state,
		$ionicPopup, $ionicLoading, $ionicHistory, OAuth, OAuthToken,
		UserService
	){
		var vm   = this;


		activate();

  
		//------------------------------
		function activate(){
			OAuthToken.removeToken();
			UserService.set(null);
			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({
				disableBack: true,
				historyRoot: true,
			});
			$state.go('login');
		}

	};
})();