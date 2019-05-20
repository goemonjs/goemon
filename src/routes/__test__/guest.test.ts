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

  test('/', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });

  test('/react', async () => {
    const response = await supertest(app).get('/react');
    expect(response.status).toBe(200);
  });

  test('/redux', async () => {
    const response = await supertest(app).get('/redux');
    expect(response.status).toBe(200);
  });
});
