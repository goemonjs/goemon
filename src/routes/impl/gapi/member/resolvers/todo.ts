import {
  UserInputError,
  ApolloError,
} from 'apollo-server-express';

import { Todo } from '../../../../../models/todo';
import { ListTasksInput, AddTaskMutationArgs, UpdateTaskMutationArgs, RemoveTaskMutationArgs } from '../gtypes';

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

async function listTasks(parent: any, args: any, context: any, info: any) {
  const input: ListTasksInput = args.input;
  const condition = {};
  const sort = {
    createdAt: args.input.orderBy == 'createdAt_ASC' ? 1 : -1
  };

  if (input.orderBy == undefined) {
    if (input.limit == undefined || input.skip == undefined) {
      return await Todo.find(condition);
    } else {
      return await Todo.find(condition).skip(input.skip).limit(input.limit);
    }
  } else {
    if (input.limit == undefined || input.skip == undefined) {
      return await Todo.find(condition).sort(sort);
    } else {
      return await Todo.find(condition).skip(input.skip).limit(input.limit).sort(sort);
    }
  }
}

async function addTask(parent: any, args: AddTaskMutationArgs, context: any, info: any) {
  let todo = new Todo({
    caption: args.caption,
    isChecked: args.isChecked
  });
  await todo.save();

  return todo;
}

async function updateTask(parent: any, args: UpdateTaskMutationArgs, context: any, info: any) {
  try {
    let todo = await Todo.findOne({ _id: args.id }).exec();
    if (todo != null) {
      todo.caption = args.caption;
      todo.isChecked = args.isChecked;
      todo.updatedAt = new Date();
      todo.save();
    }
    return todo;
  } catch (err) {
    throw new UserInputError('Invalid id');
  }
}

async function removeTask(parent: any, args: RemoveTaskMutationArgs, context: any, info: any) {
  try {
    let count = await Todo.remove({ _id: args.id }).exec();
    return count.ok;
  } catch (err) {
    throw new UserInputError('Invalid id');
  }
}
