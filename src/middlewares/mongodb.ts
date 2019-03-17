/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as glob from'glob';
import * as path from'path';
import { envs } from '../env';

import MongoMemoryServer from 'mongodb-memory-server';

module.exports = async (app: express.Express) => {

  // (<any>mongoose.Promise) = Promise;
  // mongoose.set('useCreateIndex' , true); // against MongoDB warinig
  // mongoose.set('useNewUrlParser', true); // against MongoDB warinig

  // let connectionName: string = envs.MONGODB_CONNECTION_DBNAME.value;
  // let connectionString: string = envs.MONGODB_CONNECTION_URL.value;

  // if ( connectionName === undefined ) {
  //   const mongod = new MongoMemoryServer();
  //   connectionName = await mongod.getDbName();
  //   connectionString = await mongod.getConnectionString();
  // }

  // mongoose.connect( connectionString,
  //   (err) => {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //       console.log('Success to connect database : ' + (connectionName ? connectionName : connectionString));

  //       // Load modules
  //       let strategiesPath = path.normalize(__dirname + '/mongodb/seeddata');
  //       let data = glob.sync(strategiesPath + '/*.?(js|ts)');
  //       data.forEach(function (routes) {
  //         require(routes)(app);
  //       });
  //     }
  //   }
  // );
};

process.on('SIGINT', function() { mongoose.disconnect(); });
