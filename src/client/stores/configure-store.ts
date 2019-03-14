import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { typePendingReducerSet, TypeReduxPendingState, createTypeReduxInitialState, typeReduxMiddleware } from 'type-redux';
import * as assign from 'object-assign';

import * as TodoReducer from './todo-reducer';
import * as ProfileReducer  from './profile-reducer';

export const rootReducer = combineReducers({
  ...typePendingReducerSet,
  todoState : TodoReducer.reducer,
  profileState : ProfileReducer.reducer
});

export interface IStore extends TypeReduxPendingState {
  todoState: TodoReducer.IState;
  profileState: ProfileReducer.IState;
}

export const InitialState: IStore = assign(createTypeReduxInitialState(), {
  todoState : TodoReducer.initialState,
  profileState : ProfileReducer.initialState
});

const middlewares = [typeReduxMiddleware, promiseMiddleware];

export const configureStore = (initialState: IStore = InitialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};
