(function () {
	"use strict";

	angular
		.module('app.order')
		.controller('OrderDeliveryController', OrderDeliveryController);

	OrderDeliveryController.$inject = [
		'$scope',
		'$state', '$stateParams','$ionicLoading', '$ionicPopup',
		'$pusher', 'uiGmapGoogleMapApi',
		'Order', 'UserService', '$mapOrder'
	];

	function OrderDeliveryController(
		$scope,
		$state, $stateParams, $ionicLoading, $ionicPopup,
		$pusher, uiGmapGoogleMapApi,
		Order, UserService, $mapOrder
	){
		var vm             = this;
		var pos            = 0;
		vm.order;
		vm.map             = $mapOrder;

		vm.markers         = [];
		vm.activate        = activate;
		vm.get             = get;
		vm.reload          = reload;

		activate();


		//------------------------------
		function activate(){
			$ionicLoading.show({
				template: '<md-progress-circular md-mode="indeterminate" class="md-accent"></md-progress-circular>'
			});

			get();			
			watchMarkersLength();
			googleMapVerify();
		}

		function get(){
			Order.get({
					id      : $stateParams.id,
					include : 'items,coupon'
				})
				.$promise
				.then( 
					function(data){
						vm.order = data.data;
						if(vm.order.status == 1){
							markerInit(vm.order);
						}
						else{
							$ionicPopup.alert({
								title: 'Advertência',
								template: 'Pedido não está em entrega no momento.'
							});
						}
					}
				);
		}

		function reload(){
			window.location.reload();
		}

		function markerInit(order){
			var client = UserService.getObject().client.data;
			var address = 
				client.zipcode + ', ' + 
				client.address + ', ' + 
				client.city + ' - ' + 
				client.state;
			markerCreate(address);
			positionWatchDeliveryman(order.hash);
		}

		function markerCreate(address){
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode(
				{
					address: address
				},
				function(data, status){
					if(status == google.maps.GeocoderStatus.OK){
						var latitude  = data[0].geometry.location.lat();
						var longitude = data[0].geometry.location.lng();

						vm.markers.push({
							id: 'client',
							coords: {
								latitude  : latitude,
								longitude : longitude
							},
							options: {
								icon: 'http://maps.google.com/mapfiles/kml/pal3/icon56.png'
							}
						});
					}
					else{
						$ionicPopup.alert({
								title    : 'Erro',
								template : 'Endereço não encontrado'
							});
					}
				}
			);
		}

		function positionWatchDeliveryman(hash){
			var pusher = $pusher(window.client);
			var channel = pusher.subscribe(hash);
			
			channel.bind(
				'CodeDelivery\\Events\\GetLocationDeliveryman', 
				function(data){
					var latitude  = data.geo.latitude - pos;
					var longitude = data.geo.longitude;
					pos = pos + 0.010;
					if(vm.markers.length < 2){
						vm.markers.push({
							id: 'deliveryman',
							coords: {
								latitude  : latitude,
								longitude : longitude
							},
							options: {
								icon: 'http://maps.google.com/mapfiles/kml/pal4/icon15.png'
							}
						});
					}
					
					angular.forEach(vm.markers, function(marker){
						if(marker.id == 'deliveryman'){
							marker.coords = {
								latitude  : latitude,
								longitude : longitude	
							}
						}
					});
					boundsCreate();
				}
			);
		}

		function boundsCreate(){
			var bounds = new google.maps.LatLngBounds();
			var latlng;
			angular.forEach(vm.markers, function(marker){
				latlng = new google.maps.LatLng(Number(marker.coords.latitude), Number(marker.coords.longitude));
				bounds.extend(latlng);
			});

			vm.map.bounds = {
				northeast: {
					latitude: bounds.getNorthEast().lat(),
					longitude: bounds.getNorthEast().lng(),
				},
				southwest: {
					latitude: bounds.getSouthWest().lat(),
					longitude: bounds.getSouthWest().lng(),
				}
			}
		}


		function watchMarkersLength(){
			$scope.$watch('vm.markers.length', function(value){
				if(value == 2){
					boundsCreate();
				}
			});
		}

		function googleMapVerify(){
			uiGmapGoogleMapApi.then(
				function(data){
					$ionicLoading.hide();
				},
				function(response){
					$ionicLoading.hide();
				}
			);
		}

	};
})();