(function () {
  "use strict";

  angular
    .module('app.core')
    .factory('$localStorage', $localStorage);

  $localStorage.$inject = ['$window'];

  function $localStorage($window){    
    var service = {
      get       : get,
      set       : set,
      getObject : getObject,
      setObject : setObject
    };

    return service;



    //-------------------------------
    function get(key, defaultValue){
      return $window.localStorage[key] || defaultValue;
    }

    function set(key, value){
      $window.localStorage[key] = value;
      return $window.localStorage[key];
    }

    function getObject(key){
      return JSON.parse($window.localStorage[key] || null);
    }

    function setObject(key, value){
      $window.localStorage[key] = JSON.stringify(value);
      return this.getObject(key);
    }


  };
})();