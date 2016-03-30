(function () {
  'use strict';

  angular
    .module('app', [
      'ionic',
      'btford.socket-io',
      'ngMessages',
      'ngOpenFB',
      'ngCordova'
    ])
    .constant('REST_URL', 'http://localhost:8080/')
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
        templateUrl: 'app/common/tabs.html',
        controller: 'TabsController',
        controllerAs: 'vm'
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
        cache: false,
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
        cache: false,
        url: '/tables/:yelpId',
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
        cache: false,
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
        cache: false,
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
      })
      .state('tabs.leaderboard', {
        cache: false,
        url: '/leaderboard',
        views: {
          'leaderboard-tab': {
            templateUrl: 'app/leaderBoard/leaderBoard.html',
            controller: 'LeaderBoardController',
            controllerAs: 'vm',
            resolve: {
              getLeaderBoard: getLeaderBoard
            }
          }
        }
      })
      .state('tabs.nearby', {
        cache: false,
        url: '/nearby',
        views: {
          'nearby-tab': {
            templateUrl: 'app/nearby/nearby.html',
            controller: 'NearbyController',
            controllerAs: 'vm'
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

    function getLeaderBoard(leaderBoardService) {
      return leaderBoardService.getLeaderBoard();
    }

    function getLocNearby(nearbyService) {
      return nearbyService.getLocNearby();
    }

    function getUserPicture(usersService) {
      return usersService.getUserPicture();
    }
  }

  function runBlock($ionicPlatform, $state, ngFB) {
    $ionicPlatform.ready(function() {
      // If userid exists route them to search instead of login
      localStorage.userid ? $state.go('tabs.search') : $state.go('main'); // jshint ignore:line

      ngFB.init({appId: '829169693872377'});
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
