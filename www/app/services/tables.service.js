(function () {
  angular
    .module('app')
    .factory('tablesService', tablesService);

  tablesService.$inject = ['$http', '$state'];

  function tablesService($http, $state) {
    var service = {
      toTablePage: toTablePage
    };
    return service;

    function toTablePage() {
      $state.go('tables');
    }
  }
})();
