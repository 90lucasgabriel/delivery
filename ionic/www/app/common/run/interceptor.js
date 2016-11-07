(function () {
  "use strict";

  var app = angular.module('app.run');
  app.run(run);



  //Inject ------------------------------------------
  run.$inject = [
    '$rootScope',
    '$state', 'authService', 'OAuth', 'httpBuffer'
  ];
  


  function run(
    $rootScope,
    $state, authService, OAuth, httpBuffer
  ){
    
    $rootScope.$on('event:auth-loginRequired', function(event, data){
      switch (data.data.error){
        case 'access_denied':
          if(!$rootScope.refreshingToken){
            $rootScope.refreshingToken = OAuth.getRefreshToken();
          }
          $rootScope.refreshingToken.then(
            function(data){
              authService.loginConfirmed();
              $rootScope.refreshingToken = null;
            },
            function(response){
              $state.go('logout');
            }
          );
          break;

        case 'invalid_credentials':
          httpBuffer.rejectAll(data);
          break;
          
        default:
          $state.go('logout');
          break;
      
        
      }
      

      
    });

  }
})();