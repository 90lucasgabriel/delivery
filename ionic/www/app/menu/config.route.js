(function () {
    "use strict";

    angular
        .module('app.menu')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [  
           {
                state: 'menu',
                config: {
                    url          : '/menu',
                    templateUrl  : 'app/menu/list.html',
                    controller   : 'MenuListController',
                    controllerAs : 'vm'
                }
            },
            {
                state: 'client',
                config: {
                    abstract     : true,
                    url          : '/client',
                    templateUrl  : 'app/menu/client.html',
                    controller   : 'ClientMenuController',
                    controllerAs : 'vm'
                }
            }
            
        ];
    }

})();