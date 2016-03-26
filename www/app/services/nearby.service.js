(function () {
  angular
    .module('app')
    .factory('nearbyService', nearbyService);

  nearbyService.$inject = ['$http', '$state', '$cordovaGeolocation', '$ionicPlatform'];

  function nearbyService($http, $state, $cordovaGeolocation, $ionicPlatform) {

    var service = {
      getLocNearby: getLocNearby
    };
    return service;

    function getLocNearby() {

      var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };

      // obtains users current location
      return $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(getCurrentPositionComplete)
        .then(getNearbyData)
        .catch(getCurrentPositionFailed);
    }

    function getCurrentPositionFailed(error) {
      console.log('Geocoder failed', error);
    }

    function getCurrentPositionComplete(position) {
      return {lng: position.coords.longitude, lat: position.coords.latitude};
    }
    // returns the events in mongo that match the zipcode
    function getNearbyData(lnglat) {
      var lat = lnglat.lat;
      var lng = lnglat.lng;

      return $http.get('http://localhost:8080/nearby/?lng=' + lng + '&lat=' + lat)
      .then(getNearbyComplete)
      .catch(getNearbyFailed);
    }

    function getNearbyComplete(response) {
      return response.data;
    }

    function getNearbyFailed(error) {
      console.error(error.data);
    }
  }
})();
