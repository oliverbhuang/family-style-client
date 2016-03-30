(function () {
  angular
    .module('app')
    .factory('socketService', socketService);

  socketService.$inject = ['socketFactory', 'REST_URL'];

  function socketService(socketFactory, REST_URL) {
    var socket = io.connect(REST_URL + 'table'); // jshint ignore:line
    var options = {ioSocket: socket};
    return socketFactory(options);
  }
})();
