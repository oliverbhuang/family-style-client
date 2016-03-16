(function () {
  angular
    .module('app')
    .factory('usersService', usersService);

  usersService.$inject = ['$http', '$window', '$state'];

  function usersService($http, $window, $state) {
    var service = {
      signin: signin,
      getUserId: getUserId
    };

    return service;

    function signin (username) {
      return $http.post('http://localhost:8080/users/', {username: username})
      .then(signinUser)
      .catch(signinUserFailed);

      function signinUser(response) {
        $window.localStorage['userid'] = response.data._id;
        $state.go('search');
      }

      function signinUserFailed(error) {
        console.error(error.data);
      }
    }

    function getUserId() {
      return $window.localStorage['userid'];
    }

  }
})();
