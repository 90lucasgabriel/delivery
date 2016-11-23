(function () {
    "use strict";

    angular
        .module('app.login')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {        
        routerHelper.configureStates(getStates(), '/login');
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url          : '/login',
                    templateUrl  : 'app/login/login.html',
                    controller   : 'LoginController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            },
            {
                state: 'logout',
                config: {
                    url          : '/logout',
                    controller   : 'LogoutController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            },
            {
                state: 'client.touchid',
                config: {
                    url          : '/touchid',
                    templateUrl  : 'app/login/touchid.html',
                    controller   : 'TouchIDController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            },
            {
                state: 'deliveryman.touchid',
                config: {
                    url          : '/touchid',
                    templateUrl  : 'app/login/touchid.html',
                    controller   : 'TouchIDController',
                    controllerAs : 'vm',
                    cache        : false,
                }
            }
        ];
    }

})();