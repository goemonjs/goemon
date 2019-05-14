import {
  UserInputError,
  ApolloError,
} from 'apollo-server-express';

import { Todo } from '../../../../../models/todo';
import { AddTaskInput, UpdateTaskInput, RemoveTaskInput } from '../gtypes';

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

async function addTask(obj: any, args: AddTaskInput, context: any, info: any) {
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

async function updateTask(obj: any, args: UpdateTaskInput, context: any, info: any) {
  if (!args.id) {
    throw new UserInputError('Task ID is required.');
  } else if (!args.caption) {
    throw new UserInputError('Caption is required.');
  }

  let todos = await Todo.find({ _id: args.id }).exec();
  todos[0].caption = args.caption;
  todos[0].isChecked = args.isChecked;

  return todos[0];
}

async function removeTask(obj: any, args: RemoveTaskInput, context: any, info: any) {
  if (!args.id) {
    throw new UserInputError('Caption is required.');
  }

  await Todo.remove({ _id: args.id }).exec();
}
