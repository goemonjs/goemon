import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    listTasks: [Task],
  }

  extend type Mutation {
    addTask(caption: String): Task,
    updateTask(input: UpdateTaskInput!): Task,
    removeTask(input: RemoveTaskInput!): Task
  }

  type Task {
    _id: String!
    caption: String!
    isChecked: Boolean!
  }

  input AddTaskInput {
    caption: String!
    isChecked: Boolean!
  }

  input UpdateTaskInput {
    id: String!
    caption: String!
    isChecked: Boolean!
  }

  input RemoveTaskInput {
    id: String!
  }
`;
