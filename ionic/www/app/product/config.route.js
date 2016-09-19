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
                state: 'products',
                config: {
                    abstract     : true,
                    url          : '/products',
                    template     : '<ui-view />'
                }
            },   
            {
                state: 'products.list',
                config: {
                    url          : '',
                    templateUrl  : 'app/product/list.html',
                    controller   : 'ProductListController',
                    controllerAs : 'vm'
                }
            },
            {
                state: 'products.details',
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