(function() {
  angular
    .module('app')
    .controller('LeaderBoardController', LeaderBoardController);

  LeaderBoardController.$inject = ['getLeaderBoard', 'tablesService'];

  function LeaderBoardController(getLeaderBoard, tablesService) {
    var vm = this;
    vm.restaurants = getLeaderBoard;

    vm.tablePage = function(restaurant) {
      restaurant.restaurantAddress = {
        address: [restaurant.address],
        city: restaurant.city,
        // jscs:disable
        state_code: restaurant.state_code, // jshint ignore:line
        postal_code: restaurant.postal_code // jshint ignore:line
        // jscs:enable
      };

      var restaurantObj = {
        name: restaurant.restaurantName,
        location: restaurant.restaurantAddress,
        id: restaurant.yelpId
      };
    };
  }
})();
