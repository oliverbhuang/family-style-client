(function() {
  angular
    .module('app')
    .controller('SearchController', SearchController);

  SearchController.$inject = ['yelpService', 'tablesService'];

  function SearchController(yelpService, tablesService) {
    var vm = this;
    vm.restResults = [];
    vm.restSearch = function (rest, loc) {
      yelpService.yelpSearch(rest, loc)
      .then(function(data){
        vm.restResults = data; 
      });
    };
    vm.tablePage = tablesService.toTablePage;

  }
})();
