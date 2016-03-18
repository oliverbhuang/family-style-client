(function() {
  angular
    .module('app')
    .controller('OutingsController', OutingsController);

  OutingsController.$inject = ['getUserEvents'];

  function OutingsController(getUserEvents) {
    var vm = this;
    vm.outings = getUserEvents;
  }
})();
