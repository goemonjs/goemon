/**
 * @jest-environment node
 */

import * as mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import * as supertest from 'supertest';

import * as App from '../../app';

describe('routes/guest test', () => {

  let mongoServer;
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
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

  const app = App.createApp({isTest: true});
  test('/about', async () => {
    const response = await supertest(app).get('/about');
    expect(response.status).toBe(200);
  });
});
