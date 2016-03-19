(function() {
  angular
    .module('app')
    .controller('MyTableController', MyTableController);

  MyTableController.$inject = ['getTable','tablesService', 'socketService'];

  function MyTableController(getTable, tablesService, socketService) {
    var vm = this;

    vm.dateTime = getTable.dateTime;
    vm.location = getTable.restaurantAddress;
    vm.max = getTable.max;
    vm.name = getTable.restaurantName;
    vm.users = getTable.users;
    vm.testButton = testButton;

    function testButton() {
      socketService.emit('test');
    }

    socketService.on('hello World', function (test) {
      console.log('hello World');
    });
  }
})();
