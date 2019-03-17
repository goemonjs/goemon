/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import * as express from 'express';
import { envs } from './env';
import * as dotenv from 'dotenv';
// load env vars into process.env
dotenv.config();

import { AppServer } from 'app-server';
import * as cluster from 'cluster';
import * as os from 'os';

const numCPUs = os.cpus().length;

export const appServer: AppServer = new AppServer();

/*
* Start application server
*/
export function start() {

    console.log('Starting application..');

    // Start server
    try {
      let app = createApp();

      if ( envs.SESSION_DRIVER.value == 'redis' && cluster.isMaster ) {
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
          console.log(`worker ${worker.process.pid} died. code: ${code} signal:${signal}`);
        });
      } else {
        app.listen(envs.PORT.value, () => {
          return ('Express server listening on port ' + envs.PORT.value);
        });
      }

      return app;
    } catch (err) {
      console.error(err);
    }
  // }
}

/*
* Create Default Express application
*/
function createApp() {
    let app = express();

    try {
      // Setyp enviroment values
      const envKeys = Object.keys(envs);
      envKeys.forEach( envKey => {
        if (envs[envKey].required && !process.env[envKey]) {
          throw new Error(envKey);
        }
        if ( process.env[envKey] === undefined ) {
          envs[envKey].value = envs[envKey].defaultValue as string;
        } else {
          envs[envKey].value = process.env[envKey] as string;
        }
        console.log(`process.env.${envKey} : ${process.env[envKey]} defaultValue: ${envs[envKey].value}`);
      });

      // Create express application
      return appServer.initalize(app);

    } catch (err) {

      // Show error messages
      console.error('*** ERROR ***: The environment variable is not enough.');
      console.error(`'${err.message}' not specified.`);
      console.error('Launch failed.');

      // Create error express application
      app.get('/', (req, res) => {
        res.status(500);
        res.send(`You need to set environment parameters "${err.message}".
          Please put .env files or set the envoiroment value to server.`);
      });
      return app;
    }
  }

// Global exception handler
process.on('uncaughtException', (err: any) => {
  console.error(err);
});
