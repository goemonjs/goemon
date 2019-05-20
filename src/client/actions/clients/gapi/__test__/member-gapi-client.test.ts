/**
 * @jest-environment node
 */
import * as App from '../../../../../app';
import TestHelper from '../../../../../base/utilities/test-helper';
import { MemberGApiClient } from '../member-gapi-client';

describe('routes/api test', () => {

  // let agent: supertest.SuperTest<supertest.Test>;
  let token: string;
  const app = App.createApp({ isTest: true });

  beforeAll(async () => {
    await TestHelper.initializeDB();
    const agent = await TestHelper.getAuthenticatedAgent(app);
    token = await TestHelper.getAuthToekn(agent);
  });

  afterAll(async () => {
    await TestHelper.finalizeDB();
  });

  test('/gapi/member getProfile', async () => {
    let server = TestHelper.createServer(app);
    const client = new MemberGApiClient({
      baseUrl: `http://localhost:${server.port}`,
      token: token
    });
    const result = await client.getProfile();
    expect(result.getProfile.email).toBe('test@example.com');
  });
});
