(function () {
	"use strict";

	angular
		.module('app.deliveryman')
		.controller('DeliverymanMenuController', DeliverymanMenuController);

	DeliverymanMenuController.$inject = [
		'$ionicLoading',
		'UserService'
	];

	function DeliverymanMenuController(
		$ionicLoading,
		UserService
	){
		var vm          	= this;
		vm.user;
		vm.activate     	= activate;
		vm.supportTouchID 	= false;
		

		activate();


		//------------------------------
		function activate(){
			$ionicLoading.show({
				template: '<md-progress-circular md-mode="indeterminate" class="md-accent"></md-progress-circular>'
			});		
			vm.user = userGet();
			$ionicLoading.hide();

			if(ionic.Platform.isWebView() && ionic.Platform.isIOS() && ionic.Platform.isIPad()){
				$cordovaTouchID.checkSupport().then(
					function(){
						vm.supportTouchID = true;
					}
				);
			}
		}

		function userGet(){
			return UserService.getObject();
		}
	};
})();