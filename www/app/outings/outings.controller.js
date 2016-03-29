(function() {
  angular
    .module('app')
    .controller('OutingsController', OutingsController);

  OutingsController.$inject = ['getUserEvents', 'usersService', 'tablesService'];

  function OutingsController(getUserEvents, usersService, tablesService) {
    var vm = this;
    vm.outings = getUserEvents;
    vm.removeElement = tablesService.removeRestaurant;
    vm.userId = usersService.getUserId();
    vm.removeUserFromEvent = tablesService.removeUserFromEvent;
  }
})();
