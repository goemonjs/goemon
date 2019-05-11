/**
 * @jest-environment node
 */
import { createServer } from '../../../base/utilities/test-utilities';
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
