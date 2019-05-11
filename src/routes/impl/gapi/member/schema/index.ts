import { gql } from 'apollo-server-express';
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
`;

export default [
  linkSchema,
  todoSchema,
];
