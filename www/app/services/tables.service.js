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
      createTable: createTable,
      getTableData: getTableData,
      putUserAndEvent: putUserAndEvent,
      openMaps: openMaps
    };
    return service;

    function createTable(tableInfo) {
      return $http.post('http://localhost:8080/events', tableInfo)
      .then(createTableCompleted)
      .catch(createTableFailed);

      function createTableCompleted(response) {
        var eventId = response.data;
        return $state.go('tabs.myTable', {eventId: eventId});
      }

      function createTableFailed(error) {

        console.error('Create Table Failed', error);
      }
    }

    function toTablePage(restaurantObj) {
      setRestaurant(restaurantObj);
      return $state.go('tabs.tables', {yelpId: restaurantObj.id});
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

    function getTableData(eventId) {
      return $http.get('http://localhost:8080/events/' + eventId)
      .then(getTableComplete)
      .catch(getTableFailed);

      function getTableComplete(response) {
        response.data.users = response.data.users.map(function(user) {
          return user.firstName;
        });
        return response.data;
      }

      function getTableFailed(error) {
        console.error(error.data);
      }
    }

    function putUserAndEvent(userId, eventId) {
      return $http.put('http://localhost:8080/events/' + eventId, {userId: userId})
      .then(putUserAndEventCompleted)
      .catch(putUserAndEventFailed);

      function putUserAndEventCompleted(response) {
        var eventId = response.data;
        return $state.go('tabs.myTable', {eventId: eventId});
      }

      function putUserAndEventFailed(error) {
        console.error(error);
      }
    }

    function openMaps (address) {
      var geoString = '';

      if (ionic.Platform.isIOS()) {
        geoString = 'maps://?q=' + address;
      }

      window.open(geoString, '_system');
    }
  }
})();
