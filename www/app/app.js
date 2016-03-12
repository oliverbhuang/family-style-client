(function () {
  'use strict';

  angular
    .module('app', [
      'ionic'
    ])
    .config(configBlock)
    .run(runBlock);

  function configBlock($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('tables', {
        url: '/tables',
        templateUrl: 'app/tables/tables.html',
        controller: 'TablesController',
        controllerAs: 'vm'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'app/search/search.html',
        controller: 'SearchController',
        controllerAs: 'vm'
      })
      .state('outings', {
        url: '/outings',
        templateUrl: 'app/outings/outings.html',
        controller: 'OutingsController',
        controllerAs: 'vm'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'app/tables/create.html',
        controller: 'CreateController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/main');
  }

  function runBlock($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        window.cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        window.StatusBar.styleDefault();
      }
    });
  }
})();

