(function () {
  angular
    .module('app')
    .controller('TablesController', TablesController);

	TablesController.$inject = ['$stateParams','tablesService', 'getAllEvents'];

  function TablesController($stateParams, tablesService, getAllEvents) {
    var vm = this;
    var restaurant = tablesService.getRestaurant(); 

    vm.title = restaurant.name;
    //display address has to be with a "_" in the middle
    vm.address = restaurant.location.display_address;  
    vm.tables = getAllEvents;
  }
})();
