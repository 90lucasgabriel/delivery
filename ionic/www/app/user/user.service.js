(function () {
	"use strict";

	angular
		.module('app.user')
		.factory('User', User);

	User.$inject = [
		'$resource', 
		'appConfig'
	];

	function User(
		$resource,
		appConfig
	){
		
		return $resource(appConfig.baseUrl + '/api/users/:id', {id: '@id'},{
			query:{
				isArray: false
			},
			authenticated: {
				method : 'GET',
				url    : appConfig.baseUrl + '/api/users/authenticated'
			}
		});

	};
})();