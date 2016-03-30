(function () {
  angular
    .module('app')
    .factory('leaderBoardService', leaderBoardService);

  leaderBoardService.$inject = ['$http', 'REST_URL'];

  function leaderBoardService($http, REST_URL) {
    var service = {
      getLeaderBoard: getLeaderBoard
    };

    return service;

    function getLeaderBoard() {
      return $http.get(REST_URL + 'leaderBoard/')
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
