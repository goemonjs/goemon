import * as Redux from 'redux';
import { handleActions, Action } from 'redux-actions';
import assign = require('object-assign');

import {
  ADD_TODO, IPayloadAddTodo,
  UPDATE_FETCH_STATUS,
  LOAD_TODOS,
  TOGGLE_TODOS
} from '../actions/todo-actions';
import Todo from '../models/todo';

export type IStateTodo = {
  message?: string,
  todos?: Todo[],
  isFetching?: boolean
};

const initialState: IStateTodo = {
  message: '',
  todos: [],
  isFetching: false
};

const reducers: { [key: string]: (state, action: Action<any>) => IStateTodo } = {

  [ADD_TODO]: (state: IStateTodo, action: Action<IPayloadAddTodo>) => ({
    message: action.payload.text,
    todos: state.todos.concat(action.payload.todo)
  }),

  [UPDATE_FETCH_STATUS]: (state: IStateTodo, action: Action<boolean>) => ({
    isFetching : action.payload
  }),

  [LOAD_TODOS]: (state: IStateTodo, action) => {
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

  [TOGGLE_TODOS]: (state: IStateTodo, action: Action<number>) => {
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

export function todoReducer(state: IStateTodo = initialState, action: Action<any>): IStateTodo {
  if ( reducers[action.type] != null ) {
    return assign({}, state, reducers[action.type](state, action));
  }
  return state;
}

// export function todoReducer(state:ITodoState = initialState, action:Action<any>):ITodoState {
//   switch (action.type) {
//     case ADD_TODO:
//       return assign({}, state, {
//         message:action.payload.text,
//         todos:state.todos.concat(action.payload.todo)
//       });
//     case UPDATE_FETCH_STATUS:
//       return assign({}, state, {
//         isFetching : action.payload
//       });
//     case LOAD_TODOS:
//       if ( action.error ) {
//         return assign({}, state, {
//           message:action.payload.message,
//           isFetching:false
//         });
//       }
//       return assign({}, state, {
//         todos:action.payload,
//         isFetching:false
//       });
//     case TOGGLE_TODOS:
//       let todos = state.todos.concat();
//       let id = action.payload;
//       todos.map(todo => {
//         if ( todo.id == id ) {
//           todo.completed = !todo.completed;
//           return;
//         }
//       });
//       return assign({}, state, {
//         todos:todos
//       });
//     default:
//       return state;
//   }
// }

// Sample

// export const todoReducer = handleActions({

//   [ADD_TODO]: (state: ITodoState, action: Action<any>):any => ({
//     message:action.payload.text,
//     todos:state.todos.concat(action.payload.todo)
//   }),

//   [UPDATE_FETCH_STATUS]: (state, action):ITodoState => ({
//     isFetching : action.payload
//   }),

//   [LOAD_TODOS]: (state, action):ITodoState => {
//     if ( action.error ) {
//       return {
//         message:action.payload.message,
//         isFetching:false
//       };
//     }
//     return {
//       message:state.message,
//       todos:action.payload,
//       isFetching:false
//     };
//   },

//   [TOGGLE_TODOS]: (state, action) => {
//     let todos = state.todos.concat();
//     let id = action.payload;
//     todos.map(todo => {
//       if ( todo.id == id ) {
//         todo.completed = !todo.completed;
//         return;
//       }
//     });
//     return {
//       todos:todos
//     };
//   }
// }, initialState);
