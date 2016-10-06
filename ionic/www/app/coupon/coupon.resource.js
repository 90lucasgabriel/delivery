(function () {
	"use strict";

	angular
		.module('app.coupon')
		.factory('Coupon', Coupon);

	Coupon.$inject = [
		'$resource', 
		'$state',
		'appConfig'
	];

	function Coupon(
		$resource,
		$state,
		appConfig
	){
		
		return $resource(appConfig.baseUrl + '/api/coupons/:id',{id: '@id'},{
			query:{
				isArray: false
			},
			getByCode:{
				method: 'GET',
				params: {code: '@code'},
				url: appConfig.baseUrl + '/api/coupons/code/:code'
			}
		});

	};
})();