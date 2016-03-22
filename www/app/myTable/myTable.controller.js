(function() {
  angular
    .module('app')
    .controller('MyTableController', MyTableController);

  MyTableController.$inject = ['getTable','tablesService', 'socketService', 'usersService'];

  function MyTableController(getTable, tablesService, socketService, usersService) {
    var vm = this;

    vm.chat = [];
    vm.dateTime = getTable.dateTime;
    vm.emitButton = emitButton;
    vm.eventId = getTable._id;
    vm.location = getTable.restaurantAddress;
    vm.max = getTable.max;
    vm.name = getTable.restaurantName;
    vm.users = getTable.users;

    activate();

    function activate() {
      if (vm.users.indexOf(usersService.getUsername())) {
        vm.users.push(usersService.getUsername());
      }
      socketService.emit('join', {eventId: vm.eventId, users: vm.users});
    }

    function emitButton(message) {
      socketService.emit('emitMessage', vm.eventId, {
        username: usersService.getUsername(),
        message: message
      });
      vm.message = '';
    }

    socketService.on('updateUsers', function (updatedUsers) {
      vm.users = updatedUsers;
    });

    socketService.on('returnMessage', function (message) {
      vm.chat.push(message);
    });
  }
})();
