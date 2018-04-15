import * as express from 'express';

import Config from './config/config';
import DebugConfig from './config/config-debug';
import AppServer from './app-server';

let app = express();
let config;

if ( 'development' === app.get('env') ) {
  config = new DebugConfig();
} else {
  config = new Config();
}

AppServer.initalize(app, config);

// let result = start().then((message) => {
//    console.log(message);
// });

// export async function start() {

//   AppServer.start().then( res => {
//     console.log(res);
//     return app;
//   });
// }

module.exports = app;
