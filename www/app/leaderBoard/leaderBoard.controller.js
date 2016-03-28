(function() {
  angular
    .module('app')
    .controller('LeaderBoardController', LeaderBoardController);

  LeaderBoardController.$inject = ['getLeaderBoard'];

  function LeaderBoardController(getLeaderBoard) {
    var vm = this;
    vm.restaurants = getLeaderBoard;
  }
})();
