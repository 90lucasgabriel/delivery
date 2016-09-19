(function () {
	"use strict";

	angular
		.module('app.order')
		.factory('Order', Order);

	Order.$inject = [
		'$resource', 
		'$state',
		'appConfig'
	];

	function Order(
		$resource,
		$state,
		appConfig
	){
		
		return $resource(appConfig.baseUrl + '/api/clients/orders/:id', {id: '@id'},{
			query:{
				isArray: false
			}
		});

	};
})();