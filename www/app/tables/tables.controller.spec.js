/* jshint -W117, -W030 */
describe('TablesController', function () {
  var controller;

  beforeEach(function () {
    module('app');

    inject(function ($controller) {
      tablesServiceMock = {
        putUserAndEvent: function () {
          return true;
        },
        getRestaurant: function () {
          return {name: true, location: true};
        }
      };

      usersServiceMock = {
        getUserId: function () {
          return 1;
        }
      };

      sinon.spy(tablesServiceMock, 'putUserAndEvent');
      sinon.spy(tablesServiceMock, 'getRestaurant');
      sinon.spy(usersServiceMock, 'getUserId');

      controller = $controller('TablesController', {
        tablesService: tablesServiceMock,
        getAllEvents : [],
        usersService: usersServiceMock
      });
    });
  });

  describe('#controller sepcific', function () {
    it('should have tables, location, title, and userId property', function () {
      expect(controller.tables).to.exist;
      expect(controller.location).to.exist;
      expect(controller.title).to.exist;
      expect(controller.userId).to.exist;
    });

    it('should have ', function () {
      expect(controller.tables).to.exist;
    });
  });

  describe('#tablesService specific', function () {
    it('should call getRestaurant on tablesService', function () {
      expect(tablesServiceMock.getRestaurant.calledOnce).to.equal(true);
    });

    it('should call putUserAndEvent on tablesService', function () {
      controller.updateInfo(1, 1);
      expect(tablesServiceMock.putUserAndEvent.calledOnce).to.equal(true);
      controller.updateInfo.restore();
    });
  });

  describe('#usersService specific', function () {
    it('should call getUserId on tablesService', function () {
      expect(usersServiceMock.getUserId.calledOnce).to.equal(true);
    });
  });
});
