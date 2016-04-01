(function () {
  angular
    .module('app')
    .controller('NearbyController', NearbyController);

  NearbyController.$inject = ['$scope', 'nearbyService',
    'tablesService', 'usersService', '$ionicLoading'];

  function NearbyController($scope, nearbyService, tablesService,
    usersService, $ionicLoading) {
    var vm = this;
    vm.nearbyJoinPage = tablesService.toNearbyJoinPage;
    vm.updateInfo = tablesService.putUserAndEvent;
    vm.userId = usersService.getUserId();
    vm.activate = activate;

    activate();

    vm.tablePage = function(rest) {
      var restaurantObj = {
        name: rest.restaurantName,
        location: rest.restaurantAddress,
        id: rest.yelpId
      };
      tablesService.toTablePage(restaurantObj);
    };

    function activate() {
      $ionicLoading.show({
        template: 'Loading...'
      });

      nearbyService.getLocNearby()
      .then(function (nearbyEvents) {
        vm.nearbyEvents = nearbyEvents;
        $ionicLoading.hide();
      });
    }

  }
})();
