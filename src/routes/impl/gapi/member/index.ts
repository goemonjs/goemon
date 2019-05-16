import {
  ApolloServer, gql
  // AuthenticationError
} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';

const apolloServer = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  // context: async ({ req }) => {
  //   try {
  //     const token: any = req.headers.authorization;
  //     // let result = await UserService.getUserFromJWTToken(token);

  //     // if (!result) {
  //     //   throw new AuthenticationError('Authenticate faild!');
  //     // }

  //     // const me: GUser = {
  //     //   id: result.id.toString(),
  //     //   email: result.email,
  //     //   displayName: result.displayName,
  //     // };

  //     return {
  //       me,
  //     };
  //   } catch (error) {
  //     throw new AuthenticationError(error.message);
  //   }
  // }
});

export default apolloServer;
