/**
 * @jest-environment node
 */

import mongoose from 'mongoose';
import * as mongodbMemoryServer from 'mongodb-memory-server';
import supertest from 'supertest';

import * as App from '../../app';

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

  const app = App.createApp({isTest: true});

  test('/api/items', async () => {
    const response = await supertest(app).get('/api/items');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    let result = JSON.parse(response.text);
    let expected = [{id: 1, text: 'first'}, {id: 2, text: 'second'}, {id: 3, text: 'third'}];
    expect(result).toEqual(expected);
  });

  test('/api/me', async () => {
    const response = await supertest(app).get('/api/me');
    expect(response.status).toBe(401);
  });
});
