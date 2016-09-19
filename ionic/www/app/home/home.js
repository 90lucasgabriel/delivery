(function () {
	"use strict";

	angular
		.module('app.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$cookies', '$http'];

	function HomeController($cookies, $http){
		var vm              = this;
		vm.activate         = activate;


		//------------------------------
		activate();


		//------------------------------
		function activate(){
		}
	};
})();