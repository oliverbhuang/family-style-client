(function () {
  'use strict';

  angular
    .module('app', [
      'ionic',
      'btford.socket-io'
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
      .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'app/common/tabs.html'
      })
      .state('tabs.search', {
        url: '/search',
        views: {
          'search-tab': {
            templateUrl: 'app/search/search.html',
            controller: 'SearchController',
            controllerAs: 'vm'
          }
        }
      })
      .state('tabs.outings', {
        url: '/outings',
        views: {
          'outings-tab': {
            templateUrl: 'app/outings/outings.html',
            controller: 'OutingsController',
            controllerAs: 'vm',
            resolve: {
              getUserEvents: getUserEvents
            }
          }
        }
      })
      .state('tabs.tables', {
        url: 'tables/:yelpId',
        views: {
          'search-tab': {
            templateUrl: 'app/tables/tables.html',
            controller: 'TablesController',
            controllerAs: 'vm',
            resolve: {
              getAllEvents: getAllEvents
            }
          }
        }
      })
      .state('tabs.create', {
        url: '/tables/create',
        views: {
          'search-tab': {
            templateUrl: 'app/create/create.html',
            controller: 'CreateController',
            controllerAs: 'vm'
          }
        }
      })
      .state('tabs.myTable', {
        url: '/myTable/:eventId',
        views: {
          'search-tab': {
            templateUrl: 'app/myTable/myTable.html',
            controller: 'MyTableController',
            controllerAs: 'vm',
            resolve: {
              getTable: getTable
            }
          }
        }
      });

    $urlRouterProvider.otherwise('/main');

    function getAllEvents(tablesService, $stateParams) {
      return tablesService.getAllEvents($stateParams.yelpId);
    }

    function getUserEvents(usersService) {
      return usersService.getUserEvents();
    }

    function getTable(tablesService, $stateParams) {
      return tablesService.getTableData($stateParams.eventId);
    }
  }

  function runBlock($ionicPlatform, $state) {
    $ionicPlatform.ready(function() {
      // If userid exists route them to search instead of login
      localStorage.userid ? $state.go('tabs.search') : $state.go('main'); // jshint ignore:line

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

  function getAllEvents(tablesService, $stateParams) {
    return tablesService.getAllEvents($stateParams.yelpId);
  }
})();
