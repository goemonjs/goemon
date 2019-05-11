import {
  Express,
} from 'express';
import {
  ApolloServer, gql
  // AuthenticationError,
} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';

const apolloServer = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
});

export default apolloServer;
