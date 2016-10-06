(function () {
	"use strict";

	angular
		.module('app.order')
		.factory('OrderDeliveryman', OrderDeliveryman);

	OrderDeliveryman.$inject = [
		'$resource',
		'appConfig'
	];

	function OrderDeliveryman(
		$resource,
		appConfig
	){
		
		return $resource(appConfig.baseUrl + '/api/deliverymen/orders/:id', {id: '@id'},{
			query:{
				isArray: false
			}
		});

	};
})();