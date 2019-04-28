/**
 * @jest-environment node
 */

import mongoose from 'mongoose';
import * as mongodbMemoryServer from 'mongodb-memory-server';
import supertest from 'supertest';

import * as App from '../../app';
import { Users } from '../../models/user';

describe('routes/member test', () => {

  let mongoServer;
  let agent: supertest.SuperTest<supertest.Test>;
  const app = App.createApp({isTest: true});

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

  beforeEach( (done) => {
    agent = supertest.agent(app);
    agent
      .post('/member/login')
      .send({
        userid: 'test@example.com',
        password: 'testpassword',
      })
      .expect(302)
      .then((res: any) => {
        // Workaround for jest 23.6.0 authentication cookie bug
        // https://medium.com/@internetross/a-pattern-for-creating-authenticated-sessions-for-routing-specs-with-supertest-and-jest-until-the-baf14d498e9d
        const cookie = res
          .headers['set-cookie'][0]
          .split(',')
          .map(item => item.split(';')[0]);
        agent.jar.setCookies(cookie);
        done();
      });
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
