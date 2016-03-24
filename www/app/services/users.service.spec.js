/* jshint -W117, -W030 */
describe('Service', function () {
  var usersService, $httpBackend, authRequestHandler, $state, $window;
  beforeEach(function () {
    module('app');

    inject(function (_usersService_, _$httpBackend_, _$state_, _$window_) {
      usersService = _usersService_;
      $state = _$state_;
      $httpBackend = _$httpBackend_;
      $window = _$window_;
    });

    // whitelist html files within /app directory
    var regex = /app\/([a-zA-Z]+)\/([a-zA-Z]+)\.html/;
    $httpBackend.whenGET(regex).respond(200,'');
    $httpBackend.flush();
  });

  describe('#signin', function () {
    it('should be a function', function () {
      expect(usersService.signin).to.be.a('function');
    });

    it('should set variables userid and username in local storage', function () {
      var url = 'http://localhost:8080/users/';

      $httpBackend.expectPOST(url).respond(200, {
        _id: 1,
        username: 'person'
      });

      usersService.signin('person')
      .then(function (response) {
        expect($window.localStorage['userid']).to.equal('1');
        expect($window.localStorage['username']).to.equal('person');
      });

      $httpBackend.flush();
    });

    it('should change the state url to /search', function () {
      var url = 'http://localhost:8080/users/';

      $httpBackend.expectPOST(url).respond(200, {
        _id: 1,
        username: 'person'
      });

      usersService.signin('person')
      .then(function (response) {
        expect($state.current.url).to.equal('/search');
      });

      $httpBackend.flush();
    });
  });

  describe('#getUserId', function () {
    it('should be a function', function () {
      expect(usersService.getUserId).to.be.a('function');
    });

    it('should return the userid value in the local storage', function () {
      $window.localStorage['userid'] = '1';
      expect(usersService.getUserId()).to.equal('1');
    });
  });

  describe('#getUsername', function () {
    it('should be a function', function () {
      expect(usersService.getUserId).to.be.a('function');
    });

    it('should return the username value in the local storage', function () {
      $window.localStorage['username'] = 'person';
      expect(usersService.getUsername()).to.equal('person');
    });
  });

  describe('#getUserEvents', function () {

    beforeEach(function () {
      sinon.spy(usersService, 'getUserEvents');
    });

    it('should be a function', function () {
      expect(usersService.getUserEvents).to.be.a('function');
    });

    it('should send a GET request with id in local storage', function () {
      $window.localStorage['userid'] = 10;
      var url = 'http://localhost:8080/users/10';

      $httpBackend.expectGET(url).respond(200, {
        _id: 10,
        username: 'person',
        events: ['event1', 'event2', 'event3']
      });

      usersService.getUserEvents()
      .then(function (response) {
        expect(response._id).to.equal('10');
      });
    });

    it('should return a list of events', function () {
      $window.localStorage['userid'] = 1;
      var url = 'http://localhost:8080/users/1';
      $httpBackend.expectGET(url).respond(200, {
        _id: 1,
        username: 'person',
        events: ['event1', 'event2', 'event3']
      });
      usersService.getUserEvents()
      .then(function (response) {
        expect(response).to.be.an('array');
        expect(response.length).to.equal(3);
        expect(response[0]).to.equal('event1');
        expect(response[1]).to.equal('event2');
        expect(response[2]).to.equal('event3');
      });
      $httpBackend.flush();
    });
  });
});
