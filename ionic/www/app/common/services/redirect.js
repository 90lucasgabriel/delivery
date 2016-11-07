(function () {
  "use strict";

  angular
    .module('app.service')
    .factory('$redirect', $redirect);

  $redirect.$inject = [
    '$state',
    'appConfig', 'UserService'
  ];

  function $redirect(
    $state,
    appConfig, UserService
  ){
    var service = {
      redirectLogin: redirectLogin
    };

    return service;



    //-------------------------------
    function redirectLogin(){
      var user = UserService.getObject();
      $state.go(appConfig.redirectLogin[user.role])
    }

  };
})();
