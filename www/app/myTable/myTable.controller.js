(function() {
  angular
    .module('app')
    .controller('MyTableController', MyTableController);

  MyTableController.$inject = ['$filter', 'getTable','tablesService',
  'socketService', 'usersService','$ionicScrollDelegate'];

  function MyTableController($filter, getTable, tablesService, socketService,
    usersService, $ionicScrollDelegate) {
    var vm = this;

    vm.chat = [];
    vm.dateTime = getTable.dateTime;
    vm.emitButton = emitButton;
    vm.eventId = getTable._id;
    vm.isUser = isUser;
    vm.location = getTable.restaurantAddress;
    vm.max = getTable.max;
    vm.name = getTable.restaurantName;
    vm.openMaps = tablesService.openMaps;
    vm.userId = usersService.getUserId();
    vm.users = getTable.users;

    activate();

    function activate() {
      socketService.emit('join', {eventId: vm.eventId, users: vm.users});
      socketService.emit('loadMessages', vm.eventId);
    }

    function emitButton(message) {
      socketService.emit('emitMessage', vm.eventId, {
        firstName: usersService.getFirstName(),
        pictureUrl: usersService.getUserPicture(),
        message: message,
        userid: vm.userId
      });
      vm.message = '';
    }

    function isUser(id) {
      return id === vm.userId;
    }

    socketService.removeAllListeners();

    socketService.on('loadMessages', function (messages) {
      vm.chat = messages;
    });

    socketService.on('updateUsers', function (updatedUsers) {
      vm.users = updatedUsers;
    });

    socketService.on('returnMessage', function (message) {
      vm.chat.push(message);
      $ionicScrollDelegate.scrollBottom();
    });
  }
})();
