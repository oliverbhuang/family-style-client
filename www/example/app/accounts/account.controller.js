(function() {
  angular
    .module('app')
    .controller('AccountCtrl', AccountCtrl);

  function AccountCtrl() {
    var vm = this;

    vm.settings = {
      enableFriends: true
    };
  }
})();
