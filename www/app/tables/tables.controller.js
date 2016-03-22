(function () {
  angular
    .module('app')
    .controller('TablesController', TablesController);

  TablesController.$inject = ['$stateParams','$filter','tablesService', 'getAllEvents'];

  function TablesController($stateParams, $filter, tablesService, getAllEvents) {
    var vm = this;
    var restaurant = tablesService.getRestaurant();

    // display address has to be with a "_" in the middle
    // jscs:disable
    vm.location = restaurant.location; 
    // jscs:enable
    vm.tables = getAllEvents;
    vm.title = restaurant.name;
  }
})();
