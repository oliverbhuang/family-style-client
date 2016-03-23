/* jshint -W117, -W030 */
describe('MainController', function () {
  var usersService, controller;

  beforeEach(function () {
    module('app');

    inject(function ($controller) {
      usersServiceMock = {
        signin: function () {
          return true;
        }
      };
      sinon.spy(usersServiceMock, 'signin');
      controller = $controller('MainController', {
        'usersService': usersServiceMock
      });
    });
  });
  describe('#signin', function () {
    it('should call a signin on usersService', function () {
      controller.signin('person');
      expect(usersServiceMock.signin.calledOnce).to.equal(true);
      controller.signin.restore();
    });
  });
});
