/**
 * @jest-environment node
 */

import mongoose from 'mongoose';
import * as mongodbMemoryServer from 'mongodb-memory-server';
import { Todo } from '../todo';

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

  const app = App.createApp({ isTest: true });

  test('/gapi/guest hello', async () => {
    let todo = new Todo({
      caption: 'Test caption',
      isChecked: false
    });
    await todo.save();
    let result = await Todo.findOne({ _id: todo._id }).exec();
    expect(result!.caption).toEqual('Test caption');
  });
});
