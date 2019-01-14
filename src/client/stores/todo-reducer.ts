import * as Redux from 'redux';
import { createTypeReducer } from '../../base/utility/redux';
import { handleActions, Action } from 'redux-actions';
import assign = require('object-assign');
import * as Actions from '../actions/todo-actions';
import Todo from '../models/todo';

// Type Action Reducer Samples
export type IState = {
  message: string,
  todos: Todo[],
  isFetching: boolean
};

export const initialState: IState = {
  message: 'Please add items',
  todos: [],
  isFetching: false
};

export const addTodoReducer = Actions.addTodo.reducer<IState>((state, action) => ({
  message: action.payload.text,
  todos: state.todos.concat(action.payload.todo)
}));

export const toggleTodoReducer = Actions.toggleTodo.reducer<IState>((state, action) => {
    let todos: Todo[] = state.todos.concat();
    let id: number = action.payload.id;
    todos.map(todo => {
      if ( todo.id == id ) {
        todo.completed = !todo.completed;
        return;
      }
    });
    return {
      todos: todos
    };
});

export const loadTodoReducer = Actions.loadTodos.reducer<IState>((state, action) => {
  if ( action.error ) {
    return {
      message: action.payload && action.payload.message,
    };
  }
  return {
    todos: action.payload
  };
});

export const reducer = createTypeReducer(
  initialState,
  addTodoReducer,
  loadTodoReducer,
  toggleTodoReducer
);
