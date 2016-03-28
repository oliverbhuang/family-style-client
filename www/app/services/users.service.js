(function () {
  angular
    .module('app')
    .factory('usersService', usersService);

  usersService.$inject = ['$http', '$window', '$state', 'ngFB', '$ionicPopup'];

  function usersService($http, $window, $state, ngFB, $ionicPopup) {
    var service = {
      signin: signin,
      signout: signout,
      getUserId: getUserId,
      getFirstName: getFirstName,
      getUserEvents: getUserEvents
    };

    return service;

    function signin () {
      return ngFB.login({scope: 'email, publish_actions'})
      .then(function fbResponse (response) {
        if (response.status !== 'connected') {
          throw new Error ('Facebook login failed');
        }
        return ngFB.api({path: '/me', params: {fields: 'id, name'}});
      })
      .then(function fbUserLookup(user) {
        var firstName = user.name.split(' ')[0];

        return $http.post('http://localhost:8080/users/', {
          fbId: user.id,
          fullName: user.name,
          firstName: firstName
        });
      })
      .then(signinComplete)
      .catch(signinFailed);

      function signinComplete(response) {
        $window.localStorage['userid'] = response.data._id;
        $window.localStorage['firstName'] = response.data.firstName;
        return $state.go('tabs.search');
      }

      function signinFailed(error) {
        $ionicPopup.alert({
          title: 'Couldn\'t log in',
          template: error.message
        });

        console.error(error.data);
      }
    }

    function signout () {
      $window.localStorage.removeItem('userid');
      $window.localStorage.removeItem('firstName');
      $state.go('main');
    }

    function getUserId() {
      return $window.localStorage['userid'];
    }

    function getFirstName() {
      return $window.localStorage['firstName'];
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
