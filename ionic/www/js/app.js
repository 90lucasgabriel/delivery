angular.module('app', [
  'ionic', 
  'app.core',

  'app.controllers'
  ])

.run(function($ionicPlatform) {
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

.config(function(
    $stateProvider, $urlRouterProvider,
    OAuthProvider, OAuthTokenProvider
){

  OAuthProvider.configure({
    baseUrl: 'http://localhost:8000',
    clientId: 'appid1',
    clientSecret: 'secret' // optional
  });

  OAuthTokenProvider.configure({
    name: 'token',
    options: {
      secure: false
    }
  });

  $stateProvider
  .state('login', {
    url:          '/login',
    templateUrl:  'templates/login.html',
    controller:   'LoginController',
    controllerAs: 'vm',
  });
  $urlRouterProvider.otherwise('/');
});
