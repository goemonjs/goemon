import * as express from 'express';
let path = require('path');
import { ConfigType } from './config/config';
import AppServer from './app-server';

let app: express.Express;
let config: ConfigType;

export function init() {
  app = express();

  if ( 'development' === app.get('env') ) {
    config = {
      root: path.normalize(__dirname),
      port: process.env.PORT || '3000',
      session: {
        secret: 'Aihd82920rjhdjqao299euudh3!@Zq',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge : 3600000 // 60 * 60 * 1000
        }
      }
    };
  } else {
    config = {
      root: path.normalize(__dirname),
      port: process.env.PORT,
      session: {
        secret: 'Aihd82920rjhdjqao299euudh3!@Zq',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge : 3600000 // 60 * 60 * 1000
        }
      }
    };
  }

  AppServer.initalize(app, config);

  process.on('uncaughtException', (err: any) => {
    console.log(err);
  });

  return app;
}

export function start() {
  AppServer.start();
}
