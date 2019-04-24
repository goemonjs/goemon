import * as supertest from 'supertest';
import * as http from 'http';

import * as App from '../../../app';
import HelloService from '../hello-service';

const app = App.createApp({isTest: true});

describe('/hello test', () => {

  let agent: supertest.SuperTest<supertest.Test>;

  test('hello', async (done) => {

    const server = createServer(app);
    const request = supertest.agent(server.app);

    HelloService.hello('http://localhost:' + server.port + '/hello').then( result => {
      expect(result).toEqual('Hello world!');
      done();
    });
  });

});

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
