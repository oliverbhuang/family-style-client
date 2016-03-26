(function () {
  angular
    .module('app')
    .controller('NearbyController', NearbyController);

  NearbyController.$inject = ['$scope', 'getLocNearby',
    'nearbyService', 'tablesService', 'usersService'];

  function NearbyController($scope, getLocNearby, nearbyService, tablesService, usersService) {
    var vm = this;

    vm.currLocEvents = getLocNearby;
    vm.nearbyEvents = getLocNearby;
    vm.nearbyJoinPage = tablesService.toNearbyJoinPage;
    vm.updateInfo = tablesService.putUserAndEvent;
    vm.userId = usersService.getUserId();

  }
})();
