(function () {
  'use strict';

  angular
    .module('app', [
      'ionic',
      'app.service'
    ])
    .config(configBlock)
    .run(runBlock);

  function configBlock($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'app/tabs/tabs.html'
    })
    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'app/dash/tab-dash.html'
        }
      }
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'app/chats/tab-chats.html',
          controller: 'ChatsCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'app/chats/chat-detail.html',
          controller: 'ChatDetailCtrl',
          controllerAs: 'vm'
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'app/accounts/tab-account.html',
          controller: 'AccountCtrl',
          controllerAs: 'vm'
        }
      }
    });

    $urlRouterProvider.otherwise('/tab/dash');
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

