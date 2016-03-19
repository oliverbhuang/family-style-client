(function () {
  angular
    .module('app')
    .factory('socketService', socketService);

  socketService.$inject = ['socketFactory'];

  function socketService(socketFactory) {
    var socket = io.connect('http://localhost:8080'); // jshint ignore:line
    return socketFactory({ioSocket: socket});
  }
})();
