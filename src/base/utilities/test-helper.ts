import mongoose from 'mongoose';
import supertest from 'supertest';
import http from 'http';
import * as mongodbMemoryServer from 'mongodb-memory-server';
import { Users } from '../../models/user';

let mongoServer;

export async function initializeDB() {
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

  return mongoServer;
}

export async function finalizeDB() {
  await mongoose.disconnect();
  await mongoServer.stop();
}

export async function getAuthenticatedAgent(app) {
  let agent = supertest.agent(app);
  let res: any = await agent.post('/member/login')
    .send({
      userid: 'test@example.com',
      password: 'testpassword',
    })
    .expect(302);
  // Workaround for jest 23.6.0 authentication cookie bug
  // https://medium.com/@internetross/a-pattern-for-creating-authenticated-sessions-for-routing-specs-with-supertest-and-jest-until-the-baf14d498e9d
  const cookie = res
    .headers['set-cookie'][0]
    .split(',')
    .map(item => item.split(';')[0]);
  agent.jar.setCookies(cookie);

  return agent;
}

export async function getAuthToekn(agent) {
  const response = await agent.get('/api/token')
    .expect(200);
  // expect(response.body.token).not.toBeUndefined();
  return response.body.token;
}

// jest-enviroment node is nesesarry, but this is client side test, so
// we need to consider better way
export function createServer(app) {
  const newApp = http.createServer(app);
  newApp.listen(0);

  const address: any = newApp.address();
  const port = address.port;
  // console.log('Listen port : ' + port);

  return {
    app: newApp,
    port: port
  };
}

export default {
  initializeDB,
  finalizeDB,
  getAuthenticatedAgent,
  getAuthToekn,
  createServer
};
