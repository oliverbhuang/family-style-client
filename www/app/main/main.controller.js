(function() {
  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['usersService'];

  function MainController(usersService) {
    var vm = this;
    vm.username = '';
    vm.signin = usersService.signin;
  }
})();
