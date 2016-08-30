(function () {
	"use strict";

	var app = angular.module('app.controllers',[]);
	app.controller('HomeController', HomeController);

	HomeController.$inject = ['$state', '$stateParams'];

	function HomeController($state, $stateParams){
		var vm = this;
		vm.state = $state.url;
		vm.name = $stateParams.name;
	};
})();