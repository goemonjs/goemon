/**
 * @jest-environment node
 */

import supertest from 'supertest';
import TestHelper from '../../../../../base/utilities/test-helper';
import * as App from '../../../../../app';

describe('routes/api test', () => {

  const app = App.createApp({ isTest: true });

  let token;

  beforeAll(async () => {
    await TestHelper.initializeDB();
    const agent = await TestHelper.getAuthenticatedAgent(app);
    token = await TestHelper.getAuthToekn(agent);
  });

  afterAll(async () => {
    TestHelper.finalizeDB();
  });

  beforeEach(async () => {
  });

  test('/gapi/member getProfile', async () => {
    let res = await getProfile(app);
    if (res.body.data.getProfile == null) {
      throw new Error(res.body.error.message);
    }
    expect(res.body.data.getProfile.email).toEqual('test@example.com');
  });

  async function getProfile(app) {
    return await supertest(app)
      .post('/gapi/member')
      .set('Authorization', token)
      .send({
        query:
          `query Profile {
            getProfile {
              email,
              roles,
              email,
              displayName,
              isEmailVeried,
              firstName,
              middleName,
              lastName,
              birthDay,
              createdAt,
              updatedAt
            }
          }`
      })
      .expect(200);
  }
});
