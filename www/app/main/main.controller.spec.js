/* jshint -W117, -W030 */
describe('MainController', function() {
  var controller,
      deferredLogin,
      usersServiceMock;

  // Load the App Module to access controllers
  beforeEach(module('app'));

  //stop caching for HTML load error
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function() {});
    $urlRouterProvider.deferIntercept();
  }));

  // instantiate the controller and mocks for every test
  beforeEach(inject(function($controller, $q) {
    deferredLogin = $q.defer();

    // mock usersService
    usersServiceMock = {
      signin: jasmine.createSpy('signin spy').and.returnValue(deferredLogin.promise)
    };

    // instantiate LoginController
    controller = $controller('MainController', {
      'usersService': usersServiceMock
    });
  }));

  // call doLogin on the controller for every test
  beforeEach(inject(function(_$rootScope_) {
    $rootScope = _$rootScope_;
    controller.username = 'test1';
    controller.signin(controller.username);
  }));

  describe('#signin', function() {
    it('should call signin on usersService', function() {
      expect(usersServiceMock.signin).toHaveBeenCalledWith('test1');
    });
  });
});
