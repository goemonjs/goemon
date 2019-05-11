/**
 * @jest-environment node
 */

import mongoose from 'mongoose';
import * as mongodbMemoryServer from 'mongodb-memory-server';
import supertest from 'supertest';
import * as App from '../../../../../app';

describe('routes/api test', () => {

  let mongoServer;
  beforeAll(async () => {
    mongoServer = new mongodbMemoryServer.MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    const mongooseOpts = { // options for mongoose 4.11.3 and above
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
    };

    await mongoose.connect(mongoUri, mongooseOpts, err => {
      if (err) {
        console.log('Mongoose connect to MongoMemory failed!');
        console.error(err);
      }
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  const app = App.createApp({ isTest: true });

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
