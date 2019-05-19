import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getProfile: Profile,
  }

  type Profile {
    email: String!
    roles: [String]
    displayName: String!
    isEmailVeried: Boolean
    image: String!
    firstName: String!
    middleName: String
    lastName: String!
    birthDay: String
    createdAt: String
    updatedAt: String
  }
`;
