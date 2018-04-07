import { Express, Router } from 'express';
let passport = require('passport');

const router = Router();
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

module.exports = function (app: Express) {
  app.use('/api', router);

  app.use('/api/hello', graphqlHTTP({
    schema: buildSchema(`
        type Query {
          hello: String,
          rollDice(numDice: Int!, numSides: Int): [Int],
          hoge(value: String): String,
          plus(a: Int, b: Int): Int
        }
      `
    ),
    rootValue: {
      hello: function() {
        let result = 'Hello world!';
        return result;
      },
      rollDice: function ({numDice, numSides}) {
        let output = [];
        for (let i = 0; i < numDice; i++) {
          output.push(1 + Math.floor(Math.random() * (numSides || 6)));
        }
        return output;
      },
      hoge: ({value}) => {
        let result = 'Hoge world!';
        return result + value;
      },
      plus: (a, b) => {
        return a + b;
      }
    },
    graphiql: true,
  }));
};

router.get('/items', function (req, res, next) {
  res.json([
    {id: 1, text: 'first'},
    {id: 2, text: 'second'},
    {id: 3, text: 'third'}
  ]);
});

router.get('/todos', function (req, res, next) {
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

router.get('/me', isAuthenticated, function (req: any, res, next) {
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
