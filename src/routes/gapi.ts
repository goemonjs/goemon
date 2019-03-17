import * as express from 'express';
import Hello from './impl/gapi-hello';

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
    schema: Hello.schema,
    rootValue: Hello.rootValue,
    graphiql: true,
  }));
};
