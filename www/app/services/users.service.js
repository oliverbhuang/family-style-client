(function () {
  angular
    .module('app')
    .factory('usersService', usersService);

  usersService.$inject = ['$http', '$window', '$state'];

  function usersService($http, $window, $state) {
    var service = {
      signin: signin,
      getUserId: getUserId,
      getUsername: getUsername,
      getUserEvents: getUserEvents
    };

    return service;

    function signin (username) {
      return $http.post('http://localhost:8080/users/', {username: username})
      .then(signinComplete)
      .catch(signinFailed);

      function signinComplete(response) {
        $window.localStorage['userid'] = response.data._id;
        $window.localStorage['username'] = response.data.username;
        return $state.go('tabs.search');
      }

      function signinFailed(error) {
        console.error(error.data);
      }
    }

    function getUserId() {
      return $window.localStorage['userid'];
    }

    function getUsername() {
      return $window.localStorage['username'];
    }

    function getUserEvents() {
      return $http.get('http://localhost:8080/users/' + $window.localStorage['userid'])
      .then(getUserComplete)
      .catch(getUserFailed);

      function getUserComplete(response) {
        return response.data.events;
      }

      function getUserFailed(error) {
        console.error(error.data);
      }
    }
  }
})();
