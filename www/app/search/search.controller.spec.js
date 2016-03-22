/* jshint -W117, -W030 */
describe('SearchController', function() {
  var controller,
      deferredSearch,
      deferredToTablePage,
      tablesServiceMock,
      yelpServiceMock;

  // Load the App Module to access controllers
  beforeEach(module('app'));

  //stop caching for HTML load error
  beforeEach(module(function($provide, $urlRouterProvider) {
    $provide.value('$ionicTemplateCache', function() {});
    $urlRouterProvider.deferIntercept();
  }));

  // instantiate the controller and mocks for every test
  beforeEach(inject(function($controller, $q) {
    deferredSearch = $q.defer();
    deferredToTablePage = $q.defer();

    // mock services
    tablesServiceMock = {
      toTablePage: jasmine.createSpy('toTablePage spy').and.returnValue(deferredToTablePage.promise)
    };

    yelpServiceMock = {
      yelpSearch: jasmine.createSpy('yelpSearch spy').and.returnValue(deferredSearch.promise),
    };

    // instantiate SearchController
    controller = $controller('SearchController', {
      'yelpService': yelpServiceMock,
      'tablesService': tablesServiceMock
    });
  }));

  // call doLogin on the controller for every test
  beforeEach(inject(function(_$rootScope_) {
    $rootScope = _$rootScope_;
    controller.restSearch('rest', 'loc');
    controller.tablePage('id');
  }));

  describe('#SearchController', function() {
    it('should call yelpSearch on yelpService', function() {
      expect(yelpServiceMock.yelpSearch).toHaveBeenCalledWith('rest', 'loc');
    });

    it('should call toTablePage on tablesService', function() {
      expect(tablesServiceMock.toTablePage).toHaveBeenCalled();
    });
  });
});
