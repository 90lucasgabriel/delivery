(function () {
    "use strict";

    angular
        .module('app.deliveryman')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'deliveryman',
                config: {
                    abstract     : true,
                    url          : '/deliveryman',
                    templateUrl  : 'app/deliveryman/template.html',
                    controller   : 'DeliverymanMenuController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            },
        ];
    }

})();