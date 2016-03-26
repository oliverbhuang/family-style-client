/* jshint -W117, -W030 */
describe('MainController', function () {
  var controller;

  beforeEach(function () {
    module('app');

    inject(function ($controller) {
      usersServiceMock = {
        signin: function () {
          return true;
        }
      };

      ngFBMock = {
        login: function () {
          var response = {
            status: 'connected'
          };

          return response;
        },
        api: function () {
          var user = {
            id: 1,
            name: 'test1'
          };

          return user;
        }
      };

      sinon.spy(usersServiceMock, 'signin');
      controller = $controller('MainController', {
        'usersService': usersServiceMock,
        'ngFB': ngFBMock
      });
    });
  });
  describe('#fbLogin', function () {
    it('should call a signin on usersService', function () {
      controller.fbLogin();
      expect(usersServiceMock.signin.calledOnce).to.equal(true);
      controller.fbLogin.restore();
    });
  });
});
