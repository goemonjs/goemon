/**
 * @jest-environment node
 */

import TestHelper from '../../base/utilities/test-helper';
import supertest from 'supertest';

import * as App from '../../app';

describe('routes/api test', () => {

  const app = App.createApp({ isTest: true });

  beforeAll(async () => {
    await TestHelper.initializeDB();
  });

  afterAll(async () => {
    await TestHelper.finalizeDB();
  });

  test('/gapi/guest hello', async (done) => {
    supertest(app).post('/gapi/guest')
      .send({ query: '{ hello }' })
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.hello).toBe('Hello world!');
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
