import * as express from 'express';
var pjson = require('../../../package.json');

let router = express.Router();

module.exports = (app:express.Express) => {
  app.use('/about', router);
};

router.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
  // Cache-Control header sample
  res.header('Cache-Control', 'public, max-age=60000');

  res.render('about', {
    version : pjson.version
  });
});
