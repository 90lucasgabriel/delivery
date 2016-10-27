(function () {
  "use strict";

  var core = angular.module('app.core');
  core.run(run);
  core.config(configure);

  var appConfig = {
      baseUrl   : 'http://192.168.1.105:8000',
      appTitle  : 'Angular Modular Demo',
      version   : '1.0.0',
      pusherKey : 'e9f4f98efe9fc0b14090',
  };

  core.constant('appConfig', appConfig);


  //Inject ------------------------------------------
  run.$inject = [
    '$ionicPlatform', '$ionicPush', 
    'appConfig', '$localStorage'
  ];
  
  configure.$inject = [
    '$provide', '$ionicCloudProvider',
    '$mdThemingProvider', 'OAuthProvider', 'OAuthTokenProvider', 
    'appConfig'
  ];
  
  oauthTokenLocal.$inject = [
    '$delegate', 
    '$localStorage'
  ];


  //------------------------------------------------

  function configure(
    $provide, $ionicCloudProvider,
    $mdThemingProvider, OAuthProvider, OAuthTokenProvider, 
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

    $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('yellow')
    .warnPalette('pink'); 

    $ionicCloudProvider.init({
      "core": {
        "app_id": "4deaab1f"
      },
      "push": {
        "sender_id": "658876233986",
        "pluginConfig": {
          "ios": {
            "badge": true,
            "sound": true
          },
          "android": {
            "iconColor": "#343434"
          }
        }
      }
    });
  } 

  function run(
    $ionicPlatform, $ionicPush,
    appConfig, $localStorage
  ){
    window.client = new Pusher(appConfig.pusherKey);


    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }


      if(ionic.Platform.isWebView()) {
        //ionic.Platform.fullScreen();
        StatusBar.styleBlackTranslucent();
        StatusBar.overlaysWebView(true); 
        if (ionic.Platform.isAndroid()) {
          StatusBar.backgroundColorByHexString("#ef473a");
        }
        else{
          StatusBar.overlaysWebView(true);  
        }
        //StatusBar.styleBlackTranslucent();
      }


    });

    $ionicPush.register()
    .then(function(data) {
      console.log('Token saved:', data.token);
      return $ionicPush.saveToken(data);
    }).then(function(data) {
      console.log('Token saved:', data.token);
      $localStorage.set('device_token', data.token);
    });



/*
    var push = new Ionic.Push({
      debug: true,
      onNotification: function(data){
        console.log(data);
      }
    });
    push.register(function(data){
      $localStorage.set('device_token', data.token);
    });
    */

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