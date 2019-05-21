import {
  DocumentNode,
} from 'graphql';
import {
  AuthenticationError,
  ApolloServer,
  gql,
} from 'apollo-server-express';
import glob from 'glob';
import path from 'path';

import resolvers from './resolvers';
import UserService from '../../../../services/user-service';
import { User } from './gtypes';

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
  context: async ({ req }) => {
    try {
      const token: any = req.headers.authorization;
      let user = await UserService.getUserFromJWTToken(token);

      if (!user) {
        throw new AuthenticationError('Authenticate faild');
      }

      const me: User = {
        id: user.id.toString(),
        email: user.email,
        displayName: user.displayName,
        roles: user.roles
      };

      return {
        me,
      };
    } catch (error) {
      throw new AuthenticationError(error.message);
    }
  }
});

export default apolloServer;
