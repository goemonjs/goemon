import {
  DocumentNode,
} from 'graphql';
import {
  ApolloServer,
  gql,
} from 'apollo-server-express';
import glob from 'glob';
import path from 'path';

import resolvers from './resolvers';

// Load schema
let schemasPath = glob.sync(path.normalize(__dirname + '/schema') + '/*.+(js|ts|jsx|tsx)');
let typeDefs: DocumentNode[] = [];
schemasPath.forEach(function (path) {
  let documentNode = gql(require(path));
  typeDefs.push(documentNode);
});

const apolloServer = new ApolloServer({
  introspection: true,
  typeDefs,
  resolvers,
});

export default apolloServer;
