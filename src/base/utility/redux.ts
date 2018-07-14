'use strict';

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import { Reducer, Middleware, AnyAction } from 'redux';

const REDUX_TYPE = '@@redux-type';
const PENDING_TYPE = '@@redux-type/PENDING';
const COMPLETE_TYPE = '@@redux-type/COMPLETE';

export type TypeAction<Type, Payload> = {
  type: Type,
  payload: Payload,
};

export type TypeAsyncAction<Type, Args> = {
  type: '@@redux-type/PENDING',
  payload: Type,
  meta: Args,
};

export type TypeResolveAction<Type, Args, Payload> = {
  type: Type,
  payload: Payload,
  error?: false,
  meta: Args,
};

export type TypeRejectAction<Type, Args> = {
  type: Type,
  payload?: Error,
  error: true,
  meta: Args,
};

export interface TypeReducer<State> extends Reducer<State> {
  (state: State | undefined, action: AnyAction): State;
}

export interface TypePartialReducer<Type, Payload, State> {
  (state: State, action: AnyAction): Partial<State> | undefined;
  type: Type;
}

export interface TypeActionCreator<Type, Args, Payload> {
  (args?: Args): TypeAction<Type, Payload>;
  type: Type;
  reducer<State>(reducer: (state: State, action: TypeAction<Type, Payload>) => Partial<State> | undefined): TypePartialReducer<Type, Payload, State>;
}

export interface TypeAsyncActionCreator<Type, Args, Payload> {
  (args?: Args): TypeAsyncAction<Type, Args> & Promise<Payload>;
  type: Type;
  reducer<State>(reducer: (state: State, action: TypeResolveAction<Type, Args, Payload> | TypeRejectAction<Type, Args>) => Partial<State>): TypePartialReducer<Type, Payload, State>;
  isPending<State>(state: State): boolean;
}

export function createTypeAction<Type extends string, Args, Payload = Args>(
  type: Type,
  payloadCreator: (args: Args) => Payload,
): TypeActionCreator<Type, Args, Payload> {
  const actionCreator: any = (args: Args): TypeAction<Type, Payload> => ({ type, payload: payloadCreator(args) });
  actionCreator.type = type;
  actionCreator.reducer = actionCreator.reducer = (reducer: any) => {
    const typeReducer: any = (state: any, action: any) => reducer(state, action);
    typeReducer.type = type;
    return typeReducer;
  };
  return actionCreator;
}

export function createTypeAsyncAction<Type extends string, Args, Payload>(
  type: Type,
  payloadCreator: (args: Args) => Promise<Payload>,
): TypeAsyncActionCreator<Type, Args, Payload> {
  const actionCreator: any = (args: Args): TypeAsyncAction<Type, Args> & Promise<Payload> => {
    const promise = payloadCreator(args) as any;
    promise.type = PENDING_TYPE;
    promise.payload = type;
    promise.meta = args;
    return promise;
  };
  actionCreator.type = type;
  actionCreator.reducer = (reducer: any) => {
    const typeReducer: any = (state: any, action: any) => reducer(state, action);
    typeReducer.type = type;
    return typeReducer;
  };
  actionCreator.isPending = (state: any) => isPending(type, state);
  return actionCreator;
}

export function createTypeReducer<State>(
  initialState: State | (() => State),
  ...handlers: TypePartialReducer<string, any, State>[]
): TypeReducer<State> {
  const partialReducersMap = handlers.reduce(
    (r, reducer) => {
      (r[reducer.type] || (r[reducer.type] = [])).push(reducer);
      return r;
    },
    {} as { [type: string]: ((state: State, action: any) => Partial<State> | undefined)[] });
  const reducerMap = Object.keys(partialReducersMap).reduce((r, type, index) => {
    const partialReducers = partialReducersMap[type];
    r[type] = (state: State, action: AnyAction) => {
      return partialReducers.reduce<State>((s, pr) => ({
        ...s as any,
        ...pr(s, action) as any,
      }), state);
    };
    return r;
  }, {} as { [type: string]: (state: State, action: any) => State });
  return (state = typeof initialState === 'function' ? initialState() : initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer ? reducer(state, action) : state;
  };
}

export const typeReduxMiddleware: Middleware = (store) => (next) => (action) => {
  if (!isTypeAsyncAction(action)) {
    return next(action);
  }
  const { type, payload, meta } = action;
  next({ type, payload, meta });
  action.then((resolve: any) => next({
    type: payload,
    payload: resolve,
    meta,
  }), (error: any) => next({
    type: payload,
    payload: error,
    error: true,
    meta,
  })).then(() => next({
    type: COMPLETE_TYPE,
    payload,
  }));
  return action;
};

export interface TypeReduxPendingState {
  [REDUX_TYPE]: {
    pendings: { [key: string]: number };
  };
}

export const typePendingReducerSet = {
  [REDUX_TYPE]: (state: { pendings: { [key: string]: number } } = { pendings: {} }, action: AnyAction): typeof state => {
    if (!action) {
      return state;
    }
    if (action.type === PENDING_TYPE) {
      const { pendings } = state;
      const pendingCount = (pendings[action.payload]) || 0;
      return {
        pendings: {
          ...pendings,
          [action.payload]: pendingCount + 1,
        }
      };
    } else if (action.type === COMPLETE_TYPE) {
      const { pendings } = state;
      const pendingCount = Math.max((pendings && pendings[action.payload]) || 1, 1);
      return {
        pendings: {
          ...pendings,
          [action.payload]: pendingCount - 1,
        }
      };
    }
    return state;
  }
};

export function isPending<Type = string, State extends TypeReduxPendingState = any>(type: Type, state: any): boolean {
  return !!(state[REDUX_TYPE].pendings && state[REDUX_TYPE].pendings[type]);
}

export function createTypeReduxInitialState(): TypeReduxPendingState {
  return {
    [REDUX_TYPE]: {
      pendings: {}
    }
  };
}

export function isError<Type, Args, Payload>(action: TypeResolveAction<Type, Args, Payload> | TypeRejectAction<Type, Args>): action is TypeRejectAction<Type, Args> {
  return action && !!action.error;
}

export function isTypeAsyncAction<Type, Args, Payload>(action: any): action is TypeAsyncAction<Type, Args> & Promise<Payload> {
  return action && typeof action.then === 'function' && action.type === PENDING_TYPE;
}
