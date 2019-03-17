import * as app from '../../app';
import * as supertest from 'supertest';
import { Users } from '../../models/user';

describe('Test sample', () => {

  let agent: supertest.SuperTest<supertest.Test>;

  beforeEach((done) => {
    agent = supertest.agent(app.createApp());
    agent
      .post('/member/login')
      .send({
        userid: 'test@example.com',
        password: 'testpassword',
      })
      .expect(302, done);
  });

  test('/member/profile ( not authorized )', async () => {
    const response = await supertest(app.createApp()).get('/member/profile');
    expect(response.status).toBe(302);
  });

  it('/member/profile', (done) => {
    agent.get('/member/profile')
      .expect(200)
      .end(done);
  });

  it('/api/me', async (done) => {
    await Users.createUser('test@example.com', 'testpassword');
    agent.get('/api/me')
      .expect(200)
      .end((err, response) => {
        expect(response.type).toBe('application/json');
        let result = JSON.parse(response.text);
        let expected = { email: 'test@example.com' };
        expect(result.email).toEqual(expected.email);
        done();
      });
  });
});
