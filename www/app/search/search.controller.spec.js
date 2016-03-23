/* jshint -W117, -W030 */
describe('SearchController', function () {
  var controller;

  beforeEach(function () {
    module('app');

    inject(function ($controller, $q) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      tablesServiceMock = {
        toTablePage: function () {
          return true;
        }
      };

      yelpServiceMock = {
        yelpSearch: function (rest, loc) {
          return promise;
        }
      };

      sinon.spy(tablesServiceMock, 'toTablePage');
      sinon.spy(yelpServiceMock, 'yelpSearch');

      controller = $controller('SearchController', {
        'yelpService': yelpServiceMock,
        'tablesService': tablesServiceMock
      });
    });
  });

  describe('#SearchController', function () {
    it('should call yelpSearch on yelpService', function () {
      controller.restSearch('rest', 'loc', 'form');
      expect(yelpServiceMock.yelpSearch.calledOnce).to.equal(true);
    });

    it('should call toTablePage on tablesService', function () {
      controller.tablePage('id');
      expect(tablesServiceMock.toTablePage.calledOnce).to.equal(true);
      controller.tablePage.restore();
    });
  });
});
