import {
  UserInputError,
  ApolloError,
} from 'apollo-server-express';

import { Todo } from '../../../../../models/todo';
import { ListTasksInput, MutationToAddTaskArgs, MutationToUpdateTaskArgs, MutationToRemoveTaskArgs } from '../gtypes';

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

async function listTasks(parent: any, args: any, context: { me }, info: any) {
  const input: ListTasksInput = args.input;
  const condition = {
    userId: context.me.id
  };
  const sort = {
    createdAt: args.input.orderBy == 'createdAt_ASC' ? 1 : -1
  };

  if (input.orderBy == undefined) {
    if (input.limit == undefined || input.skip == undefined) {
      return await Todo.find(condition).exec();
    } else {
      return await Todo.find(condition).skip(input.skip).limit(input.limit).exec();
    }
  } else {
    if (input.limit == undefined || input.skip == undefined) {
      return await Todo.find(condition).sort(sort).exec();
    } else {
      return await Todo.find(condition).skip(input.skip).limit(input.limit).sort(sort).exec();
    }
  }
}

async function addTask(parent: any, args: MutationToAddTaskArgs, context: { me }, info: any) {
  let todo = new Todo({
    userId: context.me.id,
    caption: args.caption,
    isChecked: args.isChecked,
  });
  await todo.save();

  return todo;
}

async function updateTask(parent: any, args: MutationToUpdateTaskArgs, context: { me }, info: any) {
  try {
    let todo = await Todo.findOne({ userId: context.me.id, _id: args.id }).exec();
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

async function removeTask(parent: any, args: MutationToRemoveTaskArgs, context: { me }, info: any) {
  try {
    let count = await Todo.remove({ userId: context.me.id, _id: args.id }).exec();
    return count.ok;
  } catch (err) {
    throw new UserInputError('Invalid id');
  }
}
