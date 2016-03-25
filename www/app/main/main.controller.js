(function() {
  angular
    .module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['usersService'];

  function MainController(usersService) {
    var vm = this;
    vm.fbLogin = usersService.signin;
  }
})();
