(function () {
  angular
    .module('app')
    .controller('TablesController', TablesController);

  TablesController.$inject = ['$stateParams','$filter','tablesService',
  'getAllEvents', 'usersService'];

  function TablesController($stateParams, $filter, tablesService, getAllEvents, usersService) {
    var vm = this;
    var restaurant = tablesService.getRestaurant();

    vm.location = restaurant.location;
    vm.tables = getAllEvents;
    vm.title = restaurant.name;
    vm.userId = usersService.getUserId();
    vm.updateInfo = tablesService.putUserAndEvent;
  }
})();
