(function() {
  angular
    .module('app')
    .controller('MyTableController', MyTableController);

  MyTableController.$inject = ['getTable','tablesService', 'socketService'];

  function MyTableController(getTable, tablesService, socketService) {
    var vm = this;

    vm.dateTime = getTable.dateTime;
    vm.emitButton = emitButton;
    vm.eventId = getTable._id;
    vm.location = getTable.restaurantAddress;
    vm.max = getTable.max;
    vm.name = getTable.restaurantName;
    vm.testButton = testButton;
    vm.users = getTable.users;

    function testButton() {
      socketService.emit('join', vm.eventId);
    }

    function emitButton(message) {
      socketService.emit('emitMessage', vm.eventId, message);
    }

    socketService.on('eventjoined', function (message) {
      console.log(message);
    });
  }
})();
