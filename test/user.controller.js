const { expect } = require('chai');
const userController = require('../src/controllers/user');
const db = require('../src/dbClient');

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb();
  });

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'matc',
        firstname: 'matia',
        lastname: 'cilly'
      };
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal('OK');
        done();
      });
    });

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'matia',
        lastname: 'cilly'
      };
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });

    it('should prevent creating an existing user', (done) => {
      // First create a user
      const user = {
        username: 'matc',
        firstname: 'matia',
        lastname: 'cilly'
      };
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal('OK');

        // Try to create the same user again
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null);
          expect(result).to.be.equal(null);
          done();
        });
      });
    });
  });

  describe('Get User', () => {
    it('should get a user by username', (done) => {
      const user = {
        username: 'matc',
        firstname: 'matia',
        lastname: 'cilly'
      };

      // First create a user
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal('OK');

        // Then try to get the same user
        userController.get(user.username, (err, foundUser) => {
          expect(err).to.be.equal(null);
          expect(foundUser).to.not.be.null;
          expect(foundUser.username).to.equal('sergkudinov');
          done();
        });
      });
    });
  });

});
