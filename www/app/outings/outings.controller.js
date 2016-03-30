(function() {
  angular
    .module('app')
    .controller('OutingsController', OutingsController);

  OutingsController.$inject = ['getUserEvents', 'usersService', 'tablesService', '$ionicPopup'];

  function OutingsController(getUserEvents, usersService, tablesService, $ionicPopup) {
    var vm = this;
    vm.outings = getUserEvents;
    //vm.removeElement = tablesService.removeRestaurant;
    vm.userId = usersService.getUserId();

    vm.removeUserFromEvent = function (userId, eventId, restaurantsArray, index) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Checkout of Table',
        template: 'Are you sure you want to checkout of this event?'
      });

      confirmPopup.then(function(yes) {
        if (yes) {
          tablesService.removeUserFromEvent(userId, eventId, restaurantsArray, index);
        }
      });
    };
  }
})();
