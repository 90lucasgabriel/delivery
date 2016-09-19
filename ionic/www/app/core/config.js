(function () {
  "use strict";

  var core = angular.module('app.core');
  core.run(run);
  core.config(configure);

  var appConfig = {
      baseUrl: 'http://localhost:8000',
      appTitle: 'Angular Modular Demo',
      version: '1.0.0'
  };

  core.constant('appConfig', appConfig);

  run.$inject = ['$ionicPlatform'];
  configure.$inject = [
    'OAuthProvider', 'OAuthTokenProvider', 
    'appConfig'
  ];  


  //------------------------------------------------

  function configure(
    OAuthProvider, OAuthTokenProvider, 
    appConfig
  ){
    OAuthProvider.configure({
      baseUrl:      appConfig.baseUrl,
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
  } 

  function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }; 

})();