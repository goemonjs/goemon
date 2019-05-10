const { setup: setupDevServer } = require('jest-dev-server');

module.exports = async function globalSetup() {
  // Start a sever before run test
  // try {
  //   await setupDevServer({
  //     command: `node ./bin/www`,
  //     launchTimeout: 50000,
  //     port: 3000,
  //   });
  //   console.log('Start server before run test!');
  // } catch (error) {
  //   console.log(`Can't start server!`);
  //   console.log(error);
  // }
};
