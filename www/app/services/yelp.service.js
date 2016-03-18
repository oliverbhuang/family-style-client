(function () {
  angular
    .module('app')
    .factory('yelpService', yelpService);

  yelpService.$inject = ['$http', '$state'];

  function yelpService($http, $state) {
    var service = {
      yelpSearch: yelpSearch
    };

    return service;

    function yelpSearch(rest, loc) {
      return $http.get('http://localhost:8080/api/yelp?term=' + rest + '&location=' + loc)
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
