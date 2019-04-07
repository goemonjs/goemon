import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { typePendingReducerSet, TypeReduxPendingState, createTypeReduxInitialState, typeReduxMiddleware } from 'type-redux';
import * as assign from 'object-assign';

import * as TodoReducer from './todo-reducer';

export const rootReducer = combineReducers({
  ...typePendingReducerSet,
  todoState : TodoReducer.reducer
});

export interface IStore extends TypeReduxPendingState {
  todoState: TodoReducer.IState;
}

export const InitialState: IStore = assign(createTypeReduxInitialState(), {
  todoState : TodoReducer.initialState,
});

const middlewares = [typeReduxMiddleware, promiseMiddleware];

export const configureStore = (initialState: IStore = InitialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};
