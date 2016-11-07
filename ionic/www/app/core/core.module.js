(function () {
	"use strict";

	angular
	.module('app.core', [
        	//Angular modules
                'ngResource',//'ngAnimate', 'ngRoute', 'ngSanitize',

                //Our reusable cross app code modules        
                'blocks.router', 'blocks.permission', 'app.filter', 'app.service', 
                
                //3rd Party modules
                'angular-oauth2', 'ngCordova', 'ngMaterial', 'pusher-angular', 'permission', 'http-auth-interceptor'
	]);
})();