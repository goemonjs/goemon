import * as express from 'express';
let passport = require('passport');

let router = express.Router();
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');

module.exports = function (app: express.Express) {
  let schema = buildSchema(`
    type Query {
      hello: String
    }
  `);

  let root = { hello: () => 'Hello world!' };

  app.use('/hello', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

  console.log('Hello!!');
};
