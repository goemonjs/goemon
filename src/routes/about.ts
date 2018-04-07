import { Express, Router } from 'express';
const pjson = require('../../../package.json');

let router = Router();

module.exports = (app: Express) => {
  app.use('/about', router);
};

router.get('/', (req, res, next) => {
  // Cache-Control header sample
  res.header('Cache-Control', 'public, max-age=60000');

  res.render('about', {
    version : pjson.version
  });
});
