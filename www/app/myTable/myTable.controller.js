(function() {
  angular
    .module('app')
    .controller('MyTableController', MyTableController);

  MyTableController.$inject = ['getTable','tablesService'];

  function MyTableController(getTable, tablesService) {
    var currTableData = getTable;
    var vm = this;

    vm.dateTime = undefined;
    vm.people = {};
    vm.restResults = {};
    vm.dateTime = currTableData.dateTime;
    vm.people.max = currTableData.max;
    vm.people.min = currTableData.min;
    vm.restResults.name = currTableData.restaurantName;
    vm.restResults.location = currTableData.restaurantAddress;

    vm.users = currTableData.users;
  }
})();
