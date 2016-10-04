(function () {
	"use strict";

	angular
		.module('app.product')
		.factory('Product', Product);

	Product.$inject = [
		'$resource', 
		'$state',
		'appConfig'
	];

	function Product(
		$resource,
		$state,
		appConfig
	){
		
		return $resource(appConfig.baseUrl + '/api/clients/products/:id',{id: '@id'},{
			query:{
				isArray: false
			}
		});

	};
})();