(function () {
  "use strict";

  var core = angular.module('blocks.permission');
  core.run(run);



  //Inject ------------------------------------------
  run.$inject = [
    'PermPermissionStore', 'PermRoleStore', 'OAuth',
    'UserService'
  ];
  


  function run(
    PermPermissionStore, PermRoleStore, OAuth,
    UserService
  ){
    PermPermissionStore.definePermission('user', function() {
        return OAuth.isAuthenticated();
    });

    //CLIENT ----------
    PermPermissionStore.definePermission('client', function() {
        var user = UserService.getObject();
        if(user == null || !user.hasOwnProperty('role')){
          return false;
        }

        return user.role == 'client';
    });

    PermRoleStore.defineRole('CLIENT-ROLE', ['user', 'client']);


    //DELIVERYMAN -----
    PermPermissionStore.definePermission('deliveryman', function() {
        var user = UserService.getObject();
        if(user == null || !user.hasOwnProperty('role')){
          return false;
        }

        return user.role == 'deliveryman';
    });

    PermRoleStore.defineRole('DELIVERYMAN-ROLE', ['user', 'deliveryman']);
  }


})();