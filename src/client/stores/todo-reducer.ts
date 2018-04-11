import * as Redux from 'redux';
import { handleActions, Action } from 'redux-actions';
import assign = require('object-assign');
import * as Actions from '../actions/todo-actions';
import Todo from '../models/todo';

export type IState = {
  message?: string,
  todos?: Todo[],
  isFetching?: boolean
};

export const initialState: IState = {
  message: 'Please add items',
  todos: [],
  isFetching: false
};

const reducers: { [key: string]: (state, action: Action<any>) => IState } = {

  [Actions.ADD_TODO]: (state: IState, action: Action<Actions.IPayloadAddTodo>) => ({
    message: action.payload.text,
    todos: state.todos.concat(action.payload.todo)
  }),

  [Actions.UPDATE_FETCH_STATUS]: (state: IState, action: Action<boolean>) => ({
    isFetching : action.payload
  }),

  [Actions.LOAD_TODOS]: (state: IState, action) => {
    if ( action.error ) {
      return {
        message: action.payload.message,
        isFetching: false
      };
    }
    return {
      todos: action.payload,
      isFetching: false
    };
  },

  [Actions.TOGGLE_TODOS]: (state: IState, action: Action<number>) => {
    let todos = state.todos.concat();
    let id = action.payload;
    todos.map(todo => {
      if ( todo.id == id ) {
        todo.completed = !todo.completed;
        return;
      }
    });
    return {
      todos: todos
    };
  }
};

export function reducer(state: IState = initialState, action: Action<any>): IState {
  if ( reducers[action.type] != null ) {
    return assign({}, state, reducers[action.type](state, action));
  }
  return state;
}
