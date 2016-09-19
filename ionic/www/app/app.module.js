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
        'app.login',
        'app.home',
        'app.order',
        'app.product',
        //'app.layout'
    ]);

})();