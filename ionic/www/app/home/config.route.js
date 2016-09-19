(function () {
    "use strict";

    angular
        .module('app.home')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/home');
    }

    function getStates() {
        return [
            {
                state: 'home',
                config: {
                    url:          '/home',
                    templateUrl:  'app/home/home.html',
                    controller:   'HomeController',
                    controllerAs: 'vm'
                }
            }
        ];
    }

})();