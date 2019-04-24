/**
 * @jest-environment node
 */

import * as mongoose from 'mongoose';
import MongoMemoryServer from 'mongodb-memory-server';
import * as supertest from 'supertest';

import * as App from '../../app';
import { Users } from '../../models/user';

describe('routes/member test', () => {

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

    await Users.createUser('test@example.com', 'testpassword', ['free']);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  let agent: supertest.SuperTest<supertest.Test>;
  const app = App.createApp({isTest: true});

  beforeEach((done) => {
    agent = supertest.agent(app);
    agent
      .post('/member/login')
      .send({
        userid: 'test@example.com',
        password: 'testpassword',
      })
      .expect(302, done);
  });

  test('/member/profile ( not authorized )', async () => {
    const response = await supertest(app).get('/member/profile');
    expect(response.status).toBe(302);
  });

  it('/member/profile', (done) => {
    agent.get('/member/profile')
      .expect(200)
      .end(done);
  });

  it('/api/me', async (done) => {
    agent.get('/api/me')
      .expect(200)
      .end((err, response) => {
        expect(response.type).toBe('application/json');
        let result = JSON.parse(response.text);
        let expected = { email: 'test@example.com' };
        expect(result.email).toEqual(expected.email);
        done();
      });
  });
});
