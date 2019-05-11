import { createTypeAction, createTypeAsyncAction } from 'type-redux';
import { Todo } from '../objects/todo';
import GuestApiClient from './clients/guest-api-client';
import config from 'react-global-configuration';

// Type Action Samples
export interface IPayloadAddTodo {
  text: string;
  todo: Todo;
}

export const addTodo = createTypeAction('ADD_TODO', (args: {
  text: string
}) => {
  return {
    text: args.text,
    todo: new Todo(args.text, false)
  };
});

export const toggleTodo = createTypeAction('TOGGLE_TODOS', (id: number) => {
  return {
    id: id
  };
});

export const listTodo = createTypeAsyncAction('LIST_TODOS', (options: any) => {
  const protocol = !options ? config.get('protocol') : options.protocol;
  const host = !options ? config.get('host') : options.host;
  const client = new GuestApiClient(protocol + '://' + host);
  return client.listTodo();
});
