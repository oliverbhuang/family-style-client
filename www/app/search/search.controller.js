(function() {
  angular
    .module('app')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['yelpService', 'tablesService'];

  function SearchController(yelpService, tablesService) {
    var vm = this;

    vm.restSearch = function (rest, loc, form) {
      yelpService.yelpSearch(rest, loc)
      .then(function(data) {
        vm.restResults = data;
        form.$submitted = false;
        vm.restaurant = '';
        vm.location = '';
      });
    };
    vm.tablePage = tablesService.toTablePage;
  }
})();
