/**
 * @jest-environment node
 */
import * as App from '../../../../../app';
import TestHelper from '../../../../../base/utilities/test-helper';

import { GuestGApiClient } from '../guest-gapi-client';

describe('routes/api test', () => {

  beforeAll(async () => {
    await TestHelper.initializeDB();
  });

  afterAll(async () => {
    await TestHelper.finalizeDB();
  });

  const app = App.createApp({ isTest: true });

  test('/gapi/guest hello', async () => {
    let server = TestHelper.createServer(app);
    const client = new GuestGApiClient({
      baseUrl: `http://localhost:${server.port}/gapi/guest`
    });
    const result = await client.hello();
    expect(result.hello).toBe('Hello world!');
  });
});
