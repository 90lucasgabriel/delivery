(function () {
	"use strict";

	var app = angular.module('app.controllers');
	app.controller('HomeController', HomeController);

	HomeController.$inject = [];

	function HomeController(){
		var vm = this;
		vm.activate = activate;


		//------------------------------
		activate();


		//------------------------------
		function activate(){
			console.log("Start");
		}
	};
})();