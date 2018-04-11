import { createStore, combineReducers, applyMiddleware } from 'redux';
let promiseMiddleware = require('redux-promise');

import * as TodoReducer from './todo-reducer';
import * as ProfileReducer  from './profile-reducer';

export const rootReducer = combineReducers({
  todoState : TodoReducer.reducer,
  profileState : ProfileReducer.reducer
});

export type IStore = {
  todoState: TodoReducer.IState,
  profileState: ProfileReducer.IState
};

export const InitialState: IStore = {
  todoState : TodoReducer.initialState,
  profileState : ProfileReducer.initialState
};

export const configureStore = (initialState: IStore = InitialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(promiseMiddleware));
};
