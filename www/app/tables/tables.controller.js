(function () {
  angular
    .module('app')
    .controller('TablesController', TablesController);

  function TablesController() {
    var vm = this;

    vm.title = '';
    vm.address = '';
    vm.tables = [];
  }
})();
