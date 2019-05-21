module.exports = `
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
