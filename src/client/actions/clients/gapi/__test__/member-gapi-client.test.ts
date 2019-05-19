/**
 * @jest-environment node
 */
import mongoose from 'mongoose';
import * as mongodbMemoryServer from 'mongodb-memory-server';
import supertest from 'supertest';
import * as App from '../../../../../app';
import { Users } from '../../../../../models/user';
import TestHelper from '../../../../../base/utilities/test-helper';
import { MemberGApiClient } from '../member-gapi-client';

describe('routes/api test', () => {

  let mongoServer;
  let agent: supertest.SuperTest<supertest.Test>;
  const app = App.createApp({ isTest: true });

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

    await Users.createUser('test@example.com', 'testpassword', ['free']);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    agent = await TestHelper.getAuthenticatedAgent(app);
  });

  test('/gapi/member getProfile', async () => {
    const token = await TestHelper.getAuthToekn(agent);

    let server = TestHelper.createServer(app);
    const client = new MemberGApiClient({
      baseUrl: `http://localhost:${server.port}`,
      token: token
    });
    const result = await client.getProfile();
    expect(result.getProfile.email).toBe('test@example.com');
  });
});
