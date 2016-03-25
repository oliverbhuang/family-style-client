/* jshint -W117, -W030, indent:2 */
describe('tablesService', function() {
  var tablesService, $httpBackend, $state;
  beforeEach(function() {
    module('app');

    inject(function(_tablesService_, _$httpBackend_, _$state_) {
      tablesService = _tablesService_;
      $httpBackend = _$httpBackend_;
      $state = _$state_;
    });

    // whitelist html files within /app directory
    var regex = /app\/([a-zA-Z]+)\/([a-zA-Z]+)\.html/;
    $httpBackend.whenGET(regex).respond(200,'');
    $httpBackend.flush();
  });

  describe('setRestaurant and getRestaurant', function () {
    var testRestObj = {
     id: 'punjab-kabab-house-san-francisco'
   };
    it('sets and gets restaurant stored in tables service', function () {
      tablesService.setRestaurant(testRestObj);
      var result = tablesService.getRestaurant();
      expect(result.id).to.equal(testRestObj.id);
    });
  });

  describe('getAllEvents', function() {
    beforeEach(function () {
      sinon.spy(tablesService, 'getAllEvents');
    });

    it('should be a function', function () {
      expect(tablesService.getAllEvents).to.be.a('function');
    });

    it('should send a GET request with yelpid', function () {
      var obj1 = {
        _id: '1',
        users: ['0','1','2']
      };
      var obj2 = {
        _id: '2',
        users: ['2', '3', '4', '5']
      };
      var array = [obj1, obj2];
      var yelpId = 'punjab-kabab-house-san-francisco';
      var url = 'http://localhost:8080/events?yelpId=' + yelpId;
      $httpBackend.expectGET(url).respond(200, array);
      tablesService.getAllEvents(yelpId)
      .then(function (response) {
        expect(response).to.be.an('array');
        expect(response.length).to.equal(2);
        expect(response[0]._id).to.equal('1');
        expect(response[0].users[0]).to.equal('0');
        expect(response[1]._id).to.equal('2');
        expect(response[1].users[0]).to.equal('2');
      });
      $httpBackend.flush();
    });
  });

  describe('getTableData', function () {
    it('should send a GET request with eventId', function () {
      var eventId = '56ec78ac97ade5b7963d4343';
      var url = 'http://localhost:8080/events/' + eventId;
      var obj1 = {
        _id: '56ec78ac97ade5b7963d4343',
        yelpId: 'punjab-kabab-house-san-francisco',
        max: 3,
        users: []
      };
      $httpBackend.expectGET(url).respond(200, obj1);
      tablesService.getTableData(eventId)
      .then(function (response) {
        expect(response).to.be.an('object');
        expect(response.users).to.be.an('array');
        expect(response.max).to.equal(3);
      });
      $httpBackend.flush();
    });
  });
});
