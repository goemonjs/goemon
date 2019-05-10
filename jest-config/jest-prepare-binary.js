const { MongoMemoryServer } = require('mongodb-memory-server');
const path = require('path');

const downloadDir = path.join(process.cwd(), '.cache');
const mongoServer = new MongoMemoryServer({
  binary: {
    downloadDir,
  }
});
console.log('Download mongodb binary');
mongoServer.getConnectionString().then(url => {
  console.log(url);
  process.exit();
}).catch(err => {
  console.log(err);
  process.exit();
});
