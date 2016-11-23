(function () {
  "use strict";

  angular
    .module('app.service')
    .factory('$auth', $auth);

  $auth.$inject = [
    '$ionicPopup', '$ionicLoading', '$ionicHistory', 
    'OAuth', 'OAuthToken',
    'appConfig', '$localStorage', '$redirect', 'UserService', 'User' 
  ];

  function $auth(
    $ionicPopup, $ionicLoading, $ionicHistory, 
    OAuth, OAuthToken,
    appConfig, $localStorage, $redirect, UserService, User    
  ){
    var service = {
      login  : login,
      logout : logout
    };

    return service;



    //-------------------------------
    function login(user){
      $ionicLoading.show({
        template: '<md-progress-circular md-mode="indeterminate" class="md-accent"></md-progress-circular>'
      });

      var token    = OAuth.getAccessToken(user);
      
      token 
        .then(function(data){
          var deviceToken = $localStorage.get('device_token');
          return User.updateDeviceToken(
            {}, 
            {device_token: deviceToken}
          ).$promise;
        })      
        .then(function(tokenData){
          return User.authenticated({include: 'client'}).$promise;
        })
        .then(
          function(userData){
            UserService.setObject(userData.data);
            $redirect.redirectLogin();
            $ionicLoading.hide();
          },
          function(response){
            UserService.setObject(null);  
            OAuthToken.removeToken();
            $ionicPopup.alert({
              title: 'Autenticação',
              template: 'Login e/ou Senha inválidos.'
            });
            $ionicLoading.hide();
          }
        );  
    }

    function logout(){
      OAuthToken.removeToken();
      UserService.set(null);
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true,
      });
    }

  };
})();
