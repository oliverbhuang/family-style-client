(function () {
  angular
    .module('app')
    .factory('tablesService', tablesService);

  tablesService.$inject = ['$http', '$state'];

  function tablesService($http, $state) {
    var service = {
      toTablePage: toTablePage,
      setRestaurant: setRestaurant,
      getRestaurant: getRestaurant,
      getAllEvents: getAllEvents
    };
    return service;

    function toTablePage(restaurantObj) {
      setRestaurant(restaurantObj); 
      $state.go('tables', {yelpId: restaurantObj.id});
    }

    var restaurant; 

    function setRestaurant(restaurantObj){
      restaurant = restaurantObj; 
    }

    function getRestaurant(){
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
