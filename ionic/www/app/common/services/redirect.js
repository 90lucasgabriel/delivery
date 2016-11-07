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
<<<<<<< HEAD
      console.log(appConfig.redirectLogin[user.role]);
=======
>>>>>>> 23-permission
      $state.go(appConfig.redirectLogin[user.role])
    }

  };
})();
