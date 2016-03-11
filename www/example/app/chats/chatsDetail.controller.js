(function () {
  'use strict';

  angular
    .module('app')
    .controller('ChatDetailCtrl', ChatDetailCtrl);

  ChatDetailCtrl.$inject = ['$stateParams', 'ChatsFactory'];

  function ChatDetailCtrl ($stateParams, ChatsFactory) {
    var vm = this;
    vm.chat = ChatsFactory.get($stateParams.chatId);
  };
})();