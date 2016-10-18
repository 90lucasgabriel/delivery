(function () {
  "use strict";

  angular
    .module('app.order')
    .factory('$mapOrder', $mapOrder);

  $mapOrder.$inject = [];

  function $mapOrder(){
    var service = {
      center    : {
        latitude  : 0,
        longitude : 0
      },
      zoom      : 13
    }

    return service;
  };
})();