const app = require('../../app');
const session = require('supertest-session');
import * as supertest from 'supertest';

let agent = supertest.agent();

describe('Test sample', () => {

  let testSession = null;
  let authenticatedSession;

  beforeEach(function (done) {
    testSession = session(app);
  });

  it('/member/login', function (done) {
    testSession.post('/member/login')
      .send({ userid: 'test@example.com', password: 'test' })
      .expect(302)
      .end(function (err) {
        if (err) { return done(err); }
        authenticatedSession = testSession;
        return done();
      });
  });

  it('/member/profile', function (done) {
    authenticatedSession.get('/member/profile')
      .expect(200)
      .end(done);
  });

  it('/member/profile2', function (done) {
    authenticatedSession.get('/member/profile2')
      .expect(404)
      .end(done);
  });
});
