const app = require('../src/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../src/dbClient');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User REST API', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb();
  });

  after(() => {
    app.close();
    db.quit();
  });

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal('success');
          expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

    // Add other tests for POST /user here...

  });

  describe('GET /user/:username', () => {

    it('should retrieve a user by username', function(done) {
      //this.timeout(15000); 
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
  
      // First, create a user
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          // Then, try to retrieve the user
          chai.request(app)
            .get(`/user/${user.username}`)
            .then((res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              expect(res.body.username).to.equal(user.username);
              done();
            })
            .catch((err) => {
              done(err);
            });
        })
        .catch((err) => {
          done(err);
        });
    });
  
    // Other tests...
  
  });
});  