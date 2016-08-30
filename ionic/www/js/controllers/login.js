(function () {
	"use strict";

	var app = angular.module('app.controllers',[]);
	app.controller('LoginController', LoginController);

	LoginController.$inject = [];

	function LoginController(){
		var vm = this;
	};
})();