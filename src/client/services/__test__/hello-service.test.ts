/**
 * @jest-environment node
 */
import http from 'http';
import * as App from '../../../app';
import HelloService from '../hello-service';

// const app = App.createApp({isTest: true});

interface IGlobalFetch {
  fetch: GlobalFetch;
}
declare var global: NodeJS.Global & IGlobalFetch;

if (!global.fetch) {
  global.fetch = require('node-fetch');
}

describe('/hello test', () => {

  test('hello', async (done) => {
    let app = App.createApp({ isTest: true });
    let server = createServer(app);
    let result = await HelloService.hello(`http://localhost:${server.port}/gapi/guest`);
    expect(result).toEqual('Hello world!');
    done();
  });
});

// jest-enviroment node is nesesarry, but this is client side test, so
// we need to consider better way
function createServer(app) {
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
