(function() {
  angular
    .module('app')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['yelpService', 'tablesService','$scope'];

  function SearchController(yelpService, tablesService, $scope) {
    var vm = this;
    vm.restResults = [];
    vm.restSearch = function (rest, loc) {
      vm.restResults = yelpService.yelpSearch(rest, loc);
    };
    vm.tablePage = tablesService.toTablePage;
  }
})();
