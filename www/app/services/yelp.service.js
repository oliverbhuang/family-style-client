(function () {
  angular
    .module('app')
    .factory('yelpService', yelpService);

  yelpService.$inject = ['$http', 'REST_URL'];

  function yelpService($http, REST_URL) {
    var service = {
      yelpSearch: yelpSearch
    };

    return service;

    function yelpSearch(rest, loc) {
      return $http.get(REST_URL + 'api/yelp?term=' + rest + '&location=' + loc)
        .then(yelpData)
        .catch(yelpFailed);

      function yelpData(response) {
        return response.data.businesses;
      }

      function yelpFailed(error) {
        console.error(error.data);
      }
    }
  }
})();
