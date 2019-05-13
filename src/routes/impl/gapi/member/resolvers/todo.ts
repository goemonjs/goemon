import {
  UserInputError,
  ApolloError,
} from 'apollo-server-express';

import { Todo } from '../../../../../models/todo';

export default {
  Query: {
    listTasks: listTasks
  },

  Mutation: {
    addTask: addTask,
    updateTask: updateTask,
    removeTask: removeTask
  }
};

async function listTasks() {
  let todos = await Todo.find({}).exec();
  return todos;
}

async function addTask(obj: any, args: any, context: any, info: any) {
  if (!args.caption) {
    throw new UserInputError('Caption is required.');
  }
  let todo = new Todo({
    caption: args.caption,
    isChecked: args.isChecked
  });
  await todo.save();

  return todo;
}

async function updateTask(obj: any, args: any, context: any, info: any) {
  if (!args.id) {
    throw new UserInputError('Task ID is required.');
  } else if (!obj.caption) {
    throw new UserInputError('Caption is required.');
  }

  let todos = await Todo.find({ _id: args.id }).exec();
  todos[0].caption = args.caption;
  todos[0].isChecked = args.isChecked;

  return todos[0];
}

async function removeTask(obj: any, args: any, context: any, info: any) {
  if (!args.id) {
    throw new UserInputError('Caption is required.');
  }

  await Todo.remove({ _id: args.id }).exec();
}
