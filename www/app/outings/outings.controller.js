(function() {
  angular
    .module('app')
    .controller('OutingsController', OutingsController);

  function OutingsController() {
    var vm = this;
    vm.outings = [];
  }
})();
