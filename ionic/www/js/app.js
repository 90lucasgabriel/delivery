angular.module('app', [
  'ionic', 
  'app.core',

  'app.controllers'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {
    url: '/home/:name',
    templateUrl: 'templates/home.html',
    controllerAs: 'vm',
    controller: 'HomeController'
  })
    .state('home.a', {
      url: '/a',
      templateUrl: 'templates/home-a.html'
    })

  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html'
  })
    .state('main.a', {
      url: '/a',
      templateUrl: 'templates/main-a.html'
    });
  $urlRouterProvider.otherwise('/');
});
