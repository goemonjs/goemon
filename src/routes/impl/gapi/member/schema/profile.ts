module.exports = `
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
