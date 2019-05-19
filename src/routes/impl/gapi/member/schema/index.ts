import { gql } from 'apollo-server-express';
import profileSchema from './profile';
import todoSchema from './todo';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  type User {
    id: String!
    email: String!
    displayName: String!
    roles: [String]
  }
`;

export default [
  linkSchema,
  todoSchema,
  profileSchema
];
