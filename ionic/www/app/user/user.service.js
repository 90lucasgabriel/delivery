(function () {
  "use strict";

  angular
    .module('app.user')
    .factory('UserService', UserService);

  UserService.$inject = ['$localStorage'];

  function UserService($localStorage){    
    var key     = 'user';
    var service = {
      get       : get,
      set       : set,
      getObject : getObject,
      setObject : setObject
    };

    return service;



    //-------------------------------
    function get(defaultValue){
      return $localStorage.get(key, defaultValue);
    }

    function set(value){
      return $localStorage.set(key, value);
    }

    function getObject(){
      return $localStorage.getObject(key);
    }

    function setObject(value){
      return $localStorage.setObject(key, value);
    }


  };
})();