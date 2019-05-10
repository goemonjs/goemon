const { teardown: teardownDevServer } = require('jest-dev-server');

module.exports = async function globalTeardown() {
  // Stop server when all test complete
  // try {
  //   await teardownDevServer();
  //   console.log('Stop server when all test-case was completed!');
  // } catch (error) {
  //   console.log(`Can't stop server!`);
  //   console.log(error);
  // }
};
