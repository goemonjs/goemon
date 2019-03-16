// load env vars into process.env
require('dotenv').config();

// imports
import * as express from 'express';
import * as cluster from 'cluster';	// (1)
import * as os from 'os';

const numCPUs = os.cpus().length;
import assign = require('object-assign');
let path = require('path');
import AppServer from './app-server';

export interface AppConfigType {
  root: string;
  port: string;
}

let app: express.Express;
let appConfig: AppConfigType = {
  root: '',
  port: ''
};

export function init(initConfig?: AppConfigType) {
  app = express();

  console.log('Node environment is ' + process.env.NODE_ENV);

  if ( 'development' === app.get('env') ) {
    appConfig = {
      root: path.normalize(__dirname),
      port: process.env.PORT || '3000'
    };
  } else {
    if ( process.env.PORT != undefined ) {
      appConfig = {
        root: path.normalize(__dirname),
        port: process.env.PORT,
      };
    }
  }

  assign({}, appConfig, initConfig);

  AppServer.initalize(app, appConfig);

  process.on('uncaughtException', (err: any) => {
    console.log(err);
  });

  return app;
}

export function start() {
  if ( cluster.isMaster ) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    AppServer.start();
    console.log(`Worker ${process.pid} started`);
  }
}
