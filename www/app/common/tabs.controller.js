(function() {
  angular
    .module('app')
    .controller('TabsController', TabsController);

  TabsController.$inject = ['usersService'];

  function TabsController(usersService) {
    var vm = this;

    vm.signout = usersService.signout;
  }
})();
