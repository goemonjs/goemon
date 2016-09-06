import * as App from '../../src/app'
import assert = require('assert');
let supertest = require('supertest');

var server = supertest.agent("http://localhost:3000");

describe('GET /api/items', () => {
  before(function(done) {
      done();
  });
  it('Return 200 when parameters are valid', (done) => {
    server
    .get('/api/items')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
  });
});
