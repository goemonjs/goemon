/**
 * @jest-environment node
 */

import TestHelper from '../../base/utilities/test-helper';
import supertest from 'supertest';

import * as App from '../../app';

describe('routes/api test', () => {

  beforeAll(async () => {
    await TestHelper.initializeDB();
  });

  afterAll(async () => {
    await TestHelper.finalizeDB();
  });

  const app = App.createApp({ isTest: true });

  test('/api/listTodos', async () => {
    const response = await supertest(app).get('/api/listTodos');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    let result = JSON.parse(response.text);
    let expected = [
      { id: 1, text: 'first feched todo', completed: false },
      { id: 2, text: 'second feched todo', completed: true },
      { id: 3, text: 'third feched todo3', completed: false }
    ];
    expect(result).toEqual(expected);
  });

  test('/api/me', async () => {
    const response = await supertest(app).get('/api/me');
    expect(response.status).toBe(401);
  });
});
