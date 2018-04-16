import * as app from '../../app';
import * as supertest from 'supertest';

describe('Test sample', () => {

  let agent: supertest.SuperTest<supertest.Test>;

  beforeEach((done) => {
    agent = supertest.agent(app.init());
    agent
      .post('/member/login')
      .send({
        userid: 'test@example.com',
        password: 'test',
      })
      .expect(302, done);
  });

  test('/member/profile ( not authorized )', async () => {
    const response = await supertest(app.init()).get('/member/profile');
    expect(response.status).toBe(302);
  });

  it('/member/profile', (done) => {
    agent.get('/member/profile')
      .expect(200)
      .end(done);
  });

  it('/api/me', (done) => {
    agent.get('/api/me')
      .expect(200)
      .end((err, response) => {
        expect(response.type).toBe('application/json');
        let result = JSON.parse(response.text);
        let expected = {id: 1, userid: 'test@example.com', username: 'Test User'};
        expect(result).toEqual(expected);
        done();
      });
  });
});
