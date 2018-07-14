import { createTypeAction, createTypeAsyncAction } from '../../base/utility/redux';
import Todo from '../models/todo';

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

export const loadTodos = createTypeAsyncAction('LOAD_TODOS', (url: string) => {
  return new Promise<Todo[]>((resolve, reject) => {
    console.log(url);
    fetch(url)
    .then(apiResult => apiResult.json())
    .then(json => resolve(json))    // Success
    .catch(error => reject(error)); // Fail
  });
});
