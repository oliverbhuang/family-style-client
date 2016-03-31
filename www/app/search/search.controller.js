(function() {
  angular
    .module('app')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['yelpService', 'tablesService'];

  function SearchController(yelpService, tablesService) {
    var vm = this;

    vm.hasSearched = false;

    vm.restSearch = function (rest, loc, form) {
      vm.restResults = [];
      vm.loadRipple = true;

      yelpService.yelpSearch(rest, loc)
      .then(function(data) {
        vm.restResults = data;
        form.$submitted = false;
        vm.hasSearched = true;
        vm.loadRipple = false;
      });
    };

    vm.tablePage = tablesService.toTablePage;
  }
})();
