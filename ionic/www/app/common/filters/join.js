(function () {
	"use strict";

	angular
		.module('app.filter')
		.filter('join', join);


	function join(){
		
		return function(input, joinString){
			return input.join(joinString);
		}

	};
})();