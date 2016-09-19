(function () {
    "use strict";

    angular
        .module('app.checkout')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'checkout',
                config: {
                    abstract     : true,
                    url          : '/checkout',
                    template     : '<ui-view />'
                }
            },
            {
                state: 'checkout.list',
                config: {
                    url          : '',
                    templateUrl  : 'app/checkout/list.html',
                    controller   : 'CheckoutListController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            },
            {
                state: 'checkout.accomplished',
                config: {
                    url          : '/accomplished',
                    templateUrl  : 'app/checkout/accomplished.html',
                    controller   : 'CheckoutAccomplishedController',
                    controllerAs : 'vm'
                }
            }
        ];
    }

})();