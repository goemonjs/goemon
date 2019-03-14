import { Express, Router } from 'express';

let router = Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'React-Express Sample'});
});

module.exports = function (app: Express) {
  app.use('/', router);
};
