(function () {
  angular
    .module('app')
    .controller('TablesController', TablesController);

  TablesController.$inject = ['$stateParams','tablesService', 'getAllEvents'];

  function TablesController($stateParams, tablesService, getAllEvents) {
    var vm = this;
    var restaurant = tablesService.getRestaurant();

    // display address has to be with a "_" in the middle
    // jscs:disable
    vm.address = restaurant.location.display_address; // jshint ignore:line
    // jscs:enable
    vm.tables = getAllEvents;
    vm.title = restaurant.name;
  }
})();
