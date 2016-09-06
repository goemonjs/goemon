import { createStore, combineReducers, applyMiddleware } from 'redux';
let promiseMiddleware = require('redux-promise');

import { todoReducer, IStateTodo } from './todo-reducer';
import { profileReducer, IStateProfile } from './profile-reducer';

export const rootReducer = combineReducers({
  todoState : todoReducer,
  profileState : profileReducer
});

export type IStore = {
  todoState:IStateTodo,
  profileState:IStateProfile
};

export const configureStore = (initialState:IStore) => {
  return createStore(rootReducer, initialState, applyMiddleware(promiseMiddleware));
};
