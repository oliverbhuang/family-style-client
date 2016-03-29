(function() {
  angular
    .module('app')
    .controller('CreateController', CreateController);

  CreateController.$inject = ['$stateParams', 'tablesService', 'usersService'];

  function CreateController($stateParams, tablesService, usersService) {
    var vm = this;
    var yelpId = $stateParams.yelpId;
    var currentRestaurant = tablesService.getRestaurant();

    // display address has to be with a "_" in the middle
    // jscs:disable
    vm.address = currentRestaurant.location.display_address; // jshint ignore:line
    vm.phone = currentRestaurant.display_phone; // jshint ignore:line
    // jscs:enable
    vm.name = currentRestaurant.name;

    vm.submit = createTableSubmit;

    function createTableSubmit () {
      vm.date.setHours(vm.time.getHours());

      var createObject = {
        yelpId: currentRestaurant.id,
        dateTime: vm.date,
        max: vm.max,
        phone: vm.phone,
        restaurantName: currentRestaurant.name,
        restaurantAddress: currentRestaurant.location,
        userId: usersService.getUserId()
      };

      tablesService.createTable(createObject);
    }
  }
})();
