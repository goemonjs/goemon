import * as express from 'express';
import HelloService from '../services/hello-service';
let passport = require('passport');

let router = express.Router();
let graphqlHTTP = require('express-graphql');

module.exports = function (app: express.Express) {
  app.use('/api', router);

  app.use('/hello', graphqlHTTP({
    schema: HelloService.hello,
    rootValue: HelloService.rootValue,
    graphiql: true,
  }));
};

router.get('/items', (req, res, next) => {
  res.json([
    {id: 1, text: 'first'},
    {id: 2, text: 'second'},
    {id: 3, text: 'third'}
  ]);
});

router.get('/todos', (req, res, next) => {
  // Be careful of security when use this headres !!
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.json([
    { id: 1, text: 'first feched todo', completed: false },
    { id: 2, text: 'second feched todo', completed: true },
    { id: 3, text: 'third feched todo', completed: false }
  ]);
});

router.get('/me', isAuthenticated, (req: any, res, next) => {
  res.json(
    {
      id : req.user.id,
      userid : req.user.userid,
      username : req.user.username
    }
  );
  //res.json(req.user);
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401);
  res.render('error', {
      message: 'Unauthorized',
      error: {}
  });
}
