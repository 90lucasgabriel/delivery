(function () {
    "use strict";

    angular
        .module('app.client')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'client',
                config: {
                    abstract     : true,
                    url          : '/client',
                    templateUrl  : 'app/client/template.html',
                    controller   : 'ClientMenuController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            },
        ];
    }

})();