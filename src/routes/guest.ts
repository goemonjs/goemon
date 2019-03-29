import { Express, Router } from 'express';

let router = Router();

router.get('/', function (req, res, next) {
  res.render('guest', { title: 'Goemon Framework Sample'});
});

module.exports = function (app: Express) {
  app.use('/', router);
};
