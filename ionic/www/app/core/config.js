(function () {
  "use strict";

  var core = angular.module('app.core');
  core.run(run);
  core.config(configure);

  var appConfig = {
      baseUrl: 'http://192.168.1.102:8000',
      appTitle: 'Angular Modular Demo',
      version: '1.0.0'
  };

  core.constant('appConfig', appConfig);


  //Inject ------------------------------------------
  run.$inject = ['$ionicPlatform'];
  
  configure.$inject = [
    '$provide',
    'OAuthProvider', 'OAuthTokenProvider', 
    'appConfig'
  ];
  
  oauthTokenLocal.$inject = [
    '$delegate', 
    '$localStorage'
  ];


  //------------------------------------------------

  function configure(
    $provide,
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

    $provide.decorator('OAuthToken', oauthTokenLocal);    
  } 

  function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      

        if(window.StatusBar) {
          StatusBar.overlaysWebView(false);
          StatusBar.styleBlackTranslucent();
          StatusBar.backgroundColorByHexString('#ce3c31');
        }

    });

  }; 

  

  function oauthTokenLocal(
    $delegate,
    $localStorage
  ){
    Object.defineProperties($delegate, {
      setToken: {
        value: function(data) {
          return $localStorage.setObject('token', data);
        },
        enumerable   : true,
        configurable : true,
        writable     : true
      },
      getToken: {
        value: function() {
          return $localStorage.getObject('token');
        },
        enumerable   : true,
        configurable : true,
        writable     : true
      },
      removeToken: {
        value: function() {
          $localStorage.setObject('token', null);
        },
        enumerable   : true,
        configurable : true,
        writable     : true
      }
    });
    return $delegate;
  }


})();