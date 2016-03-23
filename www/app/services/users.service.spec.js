/* jshint -W117, -W030 */
describe('Service', function () {
  var usersService, $httpBackend, authRequestHandler;
  beforeEach(function () {
    module('app');

    inject(function (_usersService_, _$httpBackend_) {
      usersService = _usersService_;
      $httpBackend = _$httpBackend_;
    });
    //   app/   /  .html
    var regex = /app\/([a-zA-Z]+)\/([a-zA-Z]+)\.html/;
    var html = 'app/myTable/myTable.html';
    $httpBackend.whenGET(regex).respond(200,'');
    $httpBackend.flush();
  });
  describe('#signin', function () {
    it('should send an http post request', function () {
      var url = 'http://localhost:8080/users/';
      usersService.signin('person');
      $httpBackend.expectPOST(url, {username: 'person'}).respond(200, {
        data: {
          _id: 1
        }
      });
      $httpBackend.flush();
      expect(usersService.signin).to.be.a('function');
    });
  });
});
