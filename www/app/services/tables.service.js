(function () {
  angular
    .module('app')
    .factory('tablesService', tablesService);

  tablesService.$inject = ['$http', '$state'];

  function tablesService($http, $state) {
    var restaurant;

    var service = {
      toTablePage: toTablePage,
      setRestaurant: setRestaurant,
      getRestaurant: getRestaurant,
      getAllEvents: getAllEvents,
      createTable: createTable
    };
    return service;

    function createTable(tableInfo) {
      return $http.post('http://localhost:8080/events', tableInfo)
      .then(createTableCompleted)
      .catch(createTableFailed);

      function createTableCompleted(response) {
        var eventId = response.data;
        $state.go('myTable', {eventId: eventId});
      }

      function createTableFailed(error) {
        console.error(error);
      }
    }

    function toTablePage(restaurantObj) {
      setRestaurant(restaurantObj);
      $state.go('tables', {yelpId: restaurantObj.id});
    }

    function setRestaurant(restaurantObj) {
      restaurant = restaurantObj;
    }

    function getRestaurant() {
      return restaurant;
    }

    function getAllEvents(yelpId) {
      return $http.get('http://localhost:8080/events?yelpId=' + yelpId)
      .then(getAllEventsComplete)
      .catch(getAllEventsFailed);

      function getAllEventsComplete(response) {
        return response.data;
      }

      function getAllEventsFailed(err) {
        console.err(err);
      }
    }
  }
})();
