import {
  UserInputError,
  ApolloError,
} from 'apollo-server-express';

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
  return [{
    id: 'xxxx',
    caption: 'Task1',
    isChecked: false
  }];
}

async function addTask(obj: any, args: any, context: any, info: any) {
  if (!args.caption) {
    throw new UserInputError('Caption is required.');
  }

  return args;
}

async function updateTask(obj: any) {
  if (!obj.id) {
    throw new UserInputError('Task ID is required.');
  } else if (!obj.caption) {
    throw new UserInputError('Caption is required.');
  }
}

async function removeTask(obj: any) {
  if (!obj.id) {
    throw new UserInputError('Caption is required.');
  }
}

function composeTaskObject(obj) {
  const task: any = {
    id: obj._id.toString(),
    caption: obj.caption || '',
    isChecked: false
  };

  if (!obj.caption) {
    throw new UserInputError('Caption is required.');
  }

  return task;
}
