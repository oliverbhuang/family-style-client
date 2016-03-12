(function() {
  'use strict';
  angular
    .module('app')
    .controller('ChatsCtrl', ChatsCtrl);

  ChatsCtrl.$inject = ['ChatsFactory'];

  function ChatsCtrl(ChatsFactory) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    var vm = this;

    vm.chats = ChatsFactory.all();

    vm.remove = function(chat) {
      ChatsFactory.remove(chat);
    };
  }
})();
