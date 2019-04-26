/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import { typePendingReducerSet, TypeReduxPendingState, createTypeReduxInitialState, typeReduxMiddleware } from 'type-redux';
import assign from 'object-assign';

import * as TodoReducer from './todo-reducer';
import * as MemberReducer from './member-reducers';

export const rootReducer = combineReducers<IStore>({
  ...typePendingReducerSet,
  todoState : TodoReducer.reducer,
  memberState: MemberReducer.reducer,
});

export interface IStore extends TypeReduxPendingState {
  todoState: TodoReducer.IState;
  memberState: MemberReducer.IState;
}

export const InitialState: IStore = assign(createTypeReduxInitialState(), {
  todoState : TodoReducer.initialState,
  memberState: MemberReducer.initialState,
});

const middlewares = [typeReduxMiddleware, promiseMiddleware];

export const configureStore = (initialState = InitialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
};
