(function () {
  "use strict";

  var app = angular.module('app', [
    'ionic',

    'app.core',
    'app.controllers'
  ]);

  angular.module('app.controllers', []);


  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })


  app.config(function(
      $stateProvider, $urlRouterProvider,
      OAuthProvider, OAuthTokenProvider
  ){

    OAuthProvider.configure({
      baseUrl:      'http://localhost:8000',
      clientId:     'appid1',
      clientSecret: 'secret', // optional,
      grantPath:    '/oauth/access_token'
    });

    OAuthTokenProvider.configure({
      name: 'token',
      options: {
        secure: false
      }
    });

    $stateProvider
    .state('home', {
      url:          '/home',
      templateUrl:  'templates/home.html',
      controller:   'HomeController',
      controllerAs: 'vm'
    })
    .state('login', {
      url:          '/login',
      templateUrl:  'templates/login.html',
      controller:   'LoginController',
      controllerAs: 'vm'
    });
    $urlRouterProvider.otherwise('/');
  });

})();