(function() {
  angular
    .module('app')
    .controller('CreateController', CreateController);

  function CreateController() {
    var vm = this;
    vm.name = '';
    vm.types = '';
    vm.address = '';
  }
})();
