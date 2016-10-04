(function() {
    'use strict';

    angular.module('app', [
        'ionic',
        'app.core',
        //'app.widgets',

        /*
         * Feature areas
         */
        'app.cart',
        'app.checkout',
        'app.coupon',
        'app.login',
        'app.menu',
        'app.order',
        'app.product',
        'app.user'
        //'app.layout'
    ]);

})();