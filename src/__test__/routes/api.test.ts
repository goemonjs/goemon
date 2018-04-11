import * as App from 'app';
import assert = require('assert');

const supertest = require('supertest');
const server = supertest.agent('http://localhost:3000');

describe('GET /api/items', () => {
  it('Return 200 when parameters are valid', (done) => {
    server
    .get('/api/items')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
  });
});
