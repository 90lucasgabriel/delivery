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
		var url = appConfig.baseUrl + '/api/deliverymen/orders/:id';
		return $resource(url, {id: '@id'},{
			query:{
				isArray: false
			},
			updateStatus:{
				method: 'PATCH',
				url: url + '/update-status'
			},
			geo: {
				method: 'POST',
				url: url + '/geo'
			}
		});

	};
})();