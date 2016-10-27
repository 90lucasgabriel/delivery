(function() {
    'use strict';

    angular.module('app', [
        'ionic',
        'ionic.cloud',
        'app.core',
        //'app.widgets',

        /*
         * Feature areas
         */
        'app.cart',
        'app.checkout',
        'app.client',
        'app.coupon',
        'app.deliveryman',
        'app.login',
        'app.order',
        'app.product',
        'app.user'
        //'app.layout'
    ]);

})();