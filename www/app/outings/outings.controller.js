(function() {
  angular
    .module('app')
    .controller('OutingsController', OutingsController);

  OutingsController.$inject = ['usersService'];

  function OutingsController(usersService) {
    var vm = this;

    activate();

    function activate() {
      return usersService.getUserEvents()
        .then(function (events) {
          vm.outings = events;
        });
    }
  }
})();
