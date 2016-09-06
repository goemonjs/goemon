import * as express from 'express';

let router = express.Router();

router.get('/', function (req:express.Request, res:express.Response, next:express.NextFunction) {
  res.render('index', { title: 'React-Express Sample'});
});

module.exports = function (app:express.Express) {
  app.use('/', router);
};
