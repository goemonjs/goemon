import http from 'http';

// jest-enviroment node is nesesarry, but this is client side test, so
// we need to consider better way
export function createServer(app) {
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
