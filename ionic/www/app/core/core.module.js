(function () {
	"use strict";

	angular
	.module('app.core', [
	/*
         * Angular modules
         */
        'ngResource',//'ngAnimate', 'ngRoute', 'ngSanitize',

        /*
         * Our reusable cross app code modules
         */
        'blocks.router',
        
        /*
         * 3rd Party modules
         */
        'angular-oauth2',
	]);
})();