/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cluster from 'cluster';
import * as os from 'os';

import { AppServer } from './app-server';
import { envs } from './env';

// load env vars into process.env
dotenv.config();
const numCPUs = os.cpus().length;

export const appServer: AppServer = new AppServer();

/*
* Start application server
*/
export function start() {

    console.log('Starting application...');

    // Start server
    try {
      let app = createApp();

      if ( ( envs.SESSION_DRIVER.value == 'redis' || envs.FORCE_MULTICORE_CLUSTER.value == true )
         && cluster.isMaster ) {
        console.log('Starting application as Cluster Mode');
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
}

/*
* Create Default Express application
*/
export function createApp(options?: any) {
    let app = express();

    try {
      // Setyp enviroment values
      const envKeys = Object.keys(envs);
      envKeys.forEach( async (envKey) => {
        if (envs[envKey].required && !process.env[envKey]) {
          throw new Error(envKey);
        }
        if ( process.env[envKey] === undefined ) {
          if ( envs[envKey].defaultValue == typeof(Promise) ) {
            envs[envKey].value = await envs[envKey].defaultValue();
          } else {
            envs[envKey].value = envs[envKey].defaultValue as string;
          }
        } else {
          envs[envKey].value = process.env[envKey] as string;
        }
        if (options != undefined && options.isTest != true ) {
          console.log(`process.env.${envKey}: ${process.env[envKey]}; defaultValue: ${envs[envKey].value}`);
        }
      });

      if ( options != undefined && options.isTest == true ) {
        envs.NODE_ENV.value = 'test';
      }
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

    // Create express application
    return appServer.initalize(app);
  }

// Global exception handler
process.on('uncaughtException', (err: any) => {
  console.error(err);
});
