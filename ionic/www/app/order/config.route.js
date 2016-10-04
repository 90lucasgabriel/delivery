(function () {
    "use strict";

    angular
        .module('app.order')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'client.orders',
                config: {
                    abstract     : true,
                    url          : '/orders',
                    template     : '<ui-view />'
                }
            },
            {
                state: 'client.orders.list',
                config: {
                    url          : '',
                    templateUrl  : 'app/order/list.html',
                    controller   : 'OrderListController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            },
            {
                state: 'client.orders.details',
                config: {
                    url          : '/:id',
                    templateUrl  : 'app/order/details.html',
                    controller   : 'OrderDetailsController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            }
        ];
    }

})();