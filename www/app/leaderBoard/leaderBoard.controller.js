(function() {
  angular
    .module('app')
    .controller('LeaderBoardController', LeaderBoardController);

  LeaderBoardController.$inject = ['getLeaderBoard', 'tablesService'];

  function LeaderBoardController(getLeaderBoard, tablesService) {
    var vm = this;
    vm.restaurants = getLeaderBoard;

    vm.tablePage = function(restaurant) {
      restaurant[0].restaurantAddress = {
        address: [restaurant[0].address],
        city: restaurant[0].city,
        // jscs:disable
        state_code: restaurant[0].state_code, // jshint ignore:line
        postal_code: restaurant[0].postal_code // jshint ignore:line
        // jscs:enable
      };

      var restaurantObj = {
        name: restaurant[0].restaurantName,
        location: restaurant[0].restaurantAddress,
        id: restaurant[0].yelpId,
        // jscs:disable
        image_url: restaurant[0].image // jshint ignore:line
        // jscs:enable
      };

      tablesService.toTablePage(restaurantObj);
    };
  }
})();
