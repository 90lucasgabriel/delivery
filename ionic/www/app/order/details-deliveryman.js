(function () {
	"use strict";

	angular
		.module('app.order')
		.controller('DeliverymanOrderDetailsController', DeliverymanOrderDetailsController);

	DeliverymanOrderDetailsController.$inject = [
		'$state', '$stateParams','$ionicLoading', '$ionicPopup',
		'$cordovaGeolocation',
		'OrderDeliveryman'
	];

	function DeliverymanOrderDetailsController(
		$state, $stateParams, $ionicLoading, $ionicPopup,
		$cordovaGeolocation,
		OrderDeliveryman
	){
		var vm              = this;
		var watch;
		vm.order;
		vm.activate         = activate;
		vm.get		        = get;
		vm.startDelivery    = startDelivery;

		activate();


		//------------------------------
		function activate(){
			$ionicLoading.show({
				template: '<md-progress-circular md-mode="indeterminate" class="md-accent"></md-progress-circular>'
			});

			get();
		}

		function get(){
			var params = {
				id      : $stateParams.id,
				include : 'items,coupon'
			};

			OrderDeliveryman.get(
				params,
				function(data){
					vm.order = data.data;
					$ionicLoading.hide();
				},
				function(){
					$ionicLoading.hide();
				}
			);
		}
		

		function startDelivery(){
			var params = {
				id: $stateParams.id
			};
			var paramsUpdate = {
				status: 1
			};

			$ionicPopup.alert({
				title: 'Localização',
				template: 'Parar localização?'
			}).then(function(){
				watchStop();
			});

			OrderDeliveryman.updateStatus(
				params,
				paramsUpdate,
				function(data){
					var watchOptions = {
						timeout: 30000,
						enableHighAccuracy: false
					};
					watch = $cordovaGeolocation.watchPosition(watchOptions);
					watch.then(
						null,
						function(response){
							$ionicPopup.alert({
								title: 'Localização',
								template: response
							});
							console.log('response', response);
						},
						function(position){
							var params = {
								id: $stateParams.id
							};

							var paramsUpdate = {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude
							};
							OrderDeliveryman.geo(params, paramsUpdate);	
						}
					);
					
					$ionicLoading.hide();
				},
				function(){
					$ionicLoading.hide();
				}
			);
		}

		function watchStop(argument) {
			if(watch && typeof watch == 'object' && watch.hasOwnProperty('watchID')){
				$cordovaGeolocation.clearWatch(watch.watchID);
			}
		}

	};
})();