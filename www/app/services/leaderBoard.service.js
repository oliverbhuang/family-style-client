(function () {
  angular
    .module('app')
    .factory('leaderBoardService', leaderBoardService);

  leaderBoardService.$inject = ['$http'];

  function leaderBoardService($http) {
    var service = {
      getLeaderBoard: getLeaderBoard
    };

    return service;

    function getLeaderBoard() {
      return $http.get('http://localhost:8080/leaderBoard/')
      .then(getLeaderBoardComplete)
      .catch(getLeaderBoardFailed);

      function getLeaderBoardComplete(response) {
        return response.data;
      }

      function getLeaderBoardFailed(error) {
        console.error(error.data);
      }
    }
  }

})();
