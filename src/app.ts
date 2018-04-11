import * as express from 'express';

import Config from './config/config';
import DebugConfig from './config/config-debug';
import AppServer from './app-server';

start((message) => {
   console.log(message);
});

let config;

export function start(callback) {
  let app = express();

  if ( 'development' === app.get('env') ) {
    config = new DebugConfig();
  } else {
    config = new Config();
  }

  AppServer.initalize(app, config);
  AppServer.start(callback);

  return app;
}
