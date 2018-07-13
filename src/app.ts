// load env vars into process.env
require('dotenv').config();

// imports
import * as express from 'express';
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
  AppServer.start();
}
