/**
 * @jest-environment node
 */

import TestHelper from '../../base/utilities/test-helper';
import supertest from 'supertest';

import * as App from '../../app';
import { Users } from '../../models/user';

describe('routes/member test', () => {

  let mongoServer;
  let agent: supertest.SuperTest<supertest.Test>;
  const app = App.createApp({ isTest: true });

  beforeAll(async () => {
    await TestHelper.initializeDB();
    agent = await TestHelper.getAuthenticatedAgent(app);
  });

  afterAll(async () => {
    await TestHelper.finalizeDB();
  });

  test('/member/profile ( not authorized )', async () => {
    const response = await supertest(app).get('/member/profile');
    expect(response.status).toBe(302);
  });

  it('/member/profile', (done) => {
    agent.get('/member/profile')
      .expect(200)
      .end(done);
  });

  it('/api/me', async (done) => {
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
