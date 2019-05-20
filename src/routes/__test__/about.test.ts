/**
 * @jest-environment node
 */
import TestHelper from '../../base/utilities/test-helper';
import supertest from 'supertest';

import * as App from '../../app';

describe('routes/guest test', () => {

  const app = App.createApp({ isTest: true });

  beforeAll(async () => {
    await TestHelper.initializeDB();
  });

  afterAll(async () => {
    await TestHelper.finalizeDB();
  });

  test('/about', async () => {
    const response = await supertest(app).get('/about');
    expect(response.status).toBe(200);
  });
});
