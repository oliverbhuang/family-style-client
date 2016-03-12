(function() {
  angular
    .module('app')
    .controller('MyTableController', MyTableController);

  function MyTableController() {
    var vm = this;
    vm.business = {};
    vm.business.name = undefined;
    vm.business.categories = undefined;
    vm.business.address = undefined;

    vm.datetime = undefined;
    vm.people = {};
    vm.people.max = undefined;
    vm.people.min = undefined;

    // obtain the business name, address, categories and save them

    // get the categories from the service
    // for each one create a list of the first index of each
    // save in a comma seperated string called vm.business.categories
  }
})();
