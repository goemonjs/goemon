import * as express from 'express';
import HelloService from '../services/hello-service';
let passport = require('passport');

let router = express.Router();
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');

module.exports = function (app) {
  let schema = buildSchema(`
    type Query {
      hello: String
    }
  `);

  let root = { hello: () => 'Hello world!' };

  app.use('/hello', graphqlHTTP({
    schema: HelloService.schema,
    rootValue: HelloService.rootValue,
    graphiql: true,
  }));
};
