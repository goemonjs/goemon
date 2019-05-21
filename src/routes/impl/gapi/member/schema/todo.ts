module.exports = `
  extend type Query {
    listTasks(input: ListTasksInput): [Task],
  }

  extend type Mutation {
    addTask(caption: String!, isChecked: Boolean!): Task,
    updateTask(id: String!, caption: String!, isChecked: Boolean!): Task,
    removeTask(id: String!): Int
  }

  input ListTasksInput {
    skip: Int,
    limit: Int,
    orderBy: ListTasksOrderByInput
  }

  enum ListTasksOrderByInput {
    createdAt_ASC,
    createdAt_DESC
  }

  type Task {
    _id: ID!
    caption: String!
    isChecked: Boolean!
    createdAt: String
    updatedAt: String
  }
`;
