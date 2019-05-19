import { AuthenticationError, ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
import UserService from '../../../../services/user-service';
import { User } from './gtypes';

const apolloServer = new ApolloServer({
  introspection: true,
  typeDefs: schema,
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
