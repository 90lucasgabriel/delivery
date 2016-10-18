(function () {
	"use strict";

	angular
		.module('app.order')
		.controller('OrderBottomSheetController', OrderBottomSheetController);

	OrderBottomSheetController.$inject = [
		'$state', '$stateParams'
	];

	function OrderBottomSheetController(
		$state, $stateParams
	){
		var vm              = this;
		vm.items = [
			{icon: '', name:'Detalhes'},
			{icon: '', name:'Ver entrega'},
			{icon: 'delete', name:'Excluir'},
		];
		vm.activate         = activate;

		activate();


		//------------------------------
		function activate(){
			
		}

		

	};
})();