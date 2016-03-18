(function() {
  angular
    .module('app')
    .controller('MyTableController', MyTableController);

  MyTableController.$inject = ['getTable','tablesService'];

  function MyTableController(getTable, tablesService) {
    var vm = this;

    vm.dateTime = getTable.dateTime;
    vm.max = getTable.max;
    vm.name = getTable.restaurantName;
    vm.location = getTable.restaurantAddress;

    vm.users = getTable.users;
  }
})();
