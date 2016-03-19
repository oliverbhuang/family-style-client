(function () {
  angular
    .module('app')
    .factory('socketService', socketService);

  socketService.$inject = ['socketFactory'];

  function socketService(socketFactory) {
    var socket = io.connect('http://localhost:8080/table'); // jshint ignore:line
    var options = {ioSocket: socket};
    return socketFactory(options);
  }
})();
