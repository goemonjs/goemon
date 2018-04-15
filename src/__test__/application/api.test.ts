const app = require('../../app');
import session from 'supertest-session';
import * as supertest from 'supertest';

describe('Test sample', () => {

  test('/', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });
  test('/redux', async () => {
    const response = await supertest(app).get('/redux');
    expect(response.status).toBe(200);
  });
  test('/api/items', async () => {
    const response = await supertest(app).get('/api/items');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    let result = JSON.parse(response.text);
    let expected = [{id: 1, text: 'first'}, {id: 2, text: 'second'}, {id: 3, text: 'third'}];
    expect(result).toEqual(expected);
  });
});
