/* jshint -W117, -W030, indent:2 */
describe('tablesService', function() {
  var tablesService, $httpBackend;
  beforeEach(function() {
    module('app');

    inject(function(_tablesService_, _$httpBackend_) {
      tablesService = _tablesService_;
      $httpBackend = _$httpBackend_;
    });

    // whitelist html files within /app directory
    var regex = /app\/([a-zA-Z]+)\/([a-zA-Z]+)\.html/;
    $httpBackend.whenGET(regex).respond(200,'');
    $httpBackend.flush();
  });

  describe('createTable', function() {
    it('createTable is a function', function() {
      expect(tablesService.createTable).to.be.a('function');
    });

    it('createTable should send an http post request', function () {
      var url = 'http://localhost:8080/events/';
      tablesService.createTable;
      var testObj = {
        yelpId: 'abc123',
        dateTime: '08-12-2016',
        min: 3,
        max: 10,
        restaurantName: 'Punjab',
        restaurantAddress: '123 Eddy St.',
        creatorId: '567',
        users: ['8910', '111213']
      };
      var succeeded;
      $httpBackend.expectPOST(url, testObj).respond(200)
      .then(function() {
        succeeded = true;
      });
      $httpBackend.flush();
      expect(succeeded).to.be.true;
    });
  });
});
