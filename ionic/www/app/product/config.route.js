(function () {
    "use strict";

    angular
        .module('app.product')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [  
           {
                state: 'client.products',
                config: {
                    abstract     : true,
                    url          : '/products',
                    template     : '<ui-view />'
                }
            },   
            {
                state: 'client.products.list',
                config: {
                    url          : '',
                    templateUrl  : 'app/product/list.html',
                    controller   : 'ProductListController',
                    controllerAs : 'vm'
                }
            },
            {
                state: 'client.products.details',
                config: {
                    url          : '/{id}',
                    templateUrl  : 'app/product/details.html',
                    controller   : 'ProductDetailsController',
                    controllerAs : 'vm'
                }
            },
            
        ];
    }

})();