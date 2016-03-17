(function () {
  angular
    .module('app')
    .factory('tablesService', tablesService);

  tablesService.$inject = ['$http'];

  function tablesService($http) {
    var service = {
      getAllEvents: getAllEvents
    };
    return service;

    function getAllEvents(yelpId) {
      return $http.get('http://localhost:8080/events?yelpId=' + yelpId)
      .then(getAllEventsComplete)
      .catch(getAllEventsFailed);
    }

    function getAllEventsComplete(response) {
      return response.data;
    }

    function getAllEventsFailed(err) {
      console.err(err);
    }
  }
})();
