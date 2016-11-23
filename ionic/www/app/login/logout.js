(function () {
	"use strict";

	angular
		.module('app.login')
		.controller('LogoutController', LogoutController);

	LogoutController.$inject = [
		'$state',
		'$auth'
	];

	function LogoutController(
		$state,
		$auth
	){
		var vm   = this;


		activate();

  
		//------------------------------
		function activate(){
			$auth.logout();
			$state.go('login');
		}

	};
})();