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
            //CLIENT ------------------------------------------
            {
                state: 'client.orders',
                config: {
                    abstract     : true,
                    url          : '/orders',
                    template     : '<ion-nav-view />',
                    cache        : false
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
            },
            {
                state: 'client.orders.delivery',
                config: {
                    url          : '/:id/delivery',
                    templateUrl  : 'app/order/delivery.html',
                    controller   : 'OrderDeliveryController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            },


            //DELIVERYMAN ---------------------------------------
            {
                state: 'deliveryman.orders',
                config: {
                    abstract     : true,
                    url          : '/orders',
                    template     : '<ion-nav-view />'
                }
            },
            {
                state: 'deliveryman.orders.list',
                config: {
                    url          : '',
                    templateUrl  : 'app/order/list-deliveryman.html',
                    controller   : 'DeliverymanOrderListController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            },
            {
                state: 'deliveryman.orders.details',
                config: {
                    url          : '/:id',
                    templateUrl  : 'app/order/details-deliveryman.html',
                    controller   : 'DeliverymanOrderDetailsController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            }
        ];
    }

})();