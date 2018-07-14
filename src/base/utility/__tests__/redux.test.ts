import {
  createTypeAction,
  createTypeReducer,
  createTypeAsyncAction,
  typeReduxMiddleware,
  isPending,
  typePendingReducerSet,
  createTypeReduxInitialState,
  isError,
  isTypeAsyncAction,
} from '../redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

jest.useFakeTimers();

describe('redux-utils', () => {
  describe('createAction', () => {
    it('create action', () => {
      const testAction = createTypeAction('HOGE_ACTION', jest.fn());
      expect(testAction.type).toBe('HOGE_ACTION');
    });

    it('create partial reducer ', () => {
      const testAction = createTypeAction('FUGA_ACTION', jest.fn());
      const testReducer = testAction.reducer(jest.fn());
      expect(testReducer.type).toBe('FUGA_ACTION');
    });

    it('create reducer with initialState object', () => {
      const testReducer = createTypeReducer({ a: 1, b: 'two', c: { three: true } });
      const state = testReducer(undefined, { type: 'NOP' });
      expect(state).toEqual({ a: 1, b: 'two', c: { three: true } });
    });

    it('create reducer with initialState function', () => {
      const initialStateMock = jest.fn(() => ({ a: 1, b: 'two', c: { three: true } }));
      const testReducer = createTypeReducer(initialStateMock);
      const state = testReducer(undefined, { type: 'NOP' });
      expect(state).toEqual({ a: 1, b: 'two', c: { three: true } });
      expect(initialStateMock).toHaveBeenCalledTimes(1);
    });

    it('create reducer with initialState function but not used', () => {
      const initialStateMock = jest.fn(() => ({ a: 1, b: 'two', c: { three: true } }));
      const testReducer = createTypeReducer(initialStateMock);
      const state = testReducer({ a: 3, b: 'ni', c: { one: false } }, { type: 'NOP' });
      expect(state).toEqual({ a: 3, b: 'ni', c: { one: false } });
      expect(initialStateMock).toHaveBeenCalledTimes(0);
    });

    it('call reducer function', () => {
      const testAction = createTypeAction('PIYO_ACTION', jest.fn());
      const mock = jest.fn();
      const testPartialReducer = testAction.reducer(mock);
      const testReducer = createTypeReducer({ text: '' }, testPartialReducer);
      const store = createStore(testReducer);
      store.dispatch(testAction({ hoge: 'piyo' }));
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });

  describe('createAsyncAction', () => {
    it('create action', () => {
      const testAction = createTypeAsyncAction('HOGE_ACTION', jest.fn());
      expect(testAction.type).toBe('HOGE_ACTION');
    });

    it('create reducer', () => {
      const testAction = createTypeAsyncAction('FUGA_ACTION', jest.fn());
      const testReducer = testAction.reducer(jest.fn());
      expect(testReducer.type).toBe('FUGA_ACTION');
    });

    it('action isPending', async () => {
      const testAction = createTypeAsyncAction('PIYO_ACTION', () =>
        new Promise((resolve) => setTimeout(resolve, 100000)));
      const mock = jest.fn((state) => state);
      const testReducer = createTypeReducer({}, testAction.reducer(mock));
      const reducer = combineReducers({
        ...typePendingReducerSet,
        test: testReducer,
      });
      const store = createStore(reducer, {}, applyMiddleware(typeReduxMiddleware));
      const promise = store.dispatch(testAction());
      expect(testAction.isPending(store.getState())).toBeTruthy();
      jest.runAllTimers();
      await promise;
      expect(testAction.isPending(store.getState())).toBeFalsy();
      expect(mock).toHaveBeenCalledTimes(1);
    });

    it('global isPending', async () => {
      const promise = new Promise((resolve) => setTimeout(resolve, 100000));
      const testAction = createTypeAsyncAction('PIYO_ACTION', () => promise);
      const mock = jest.fn((state) => state);
      const testReducer = createTypeReducer({}, testAction.reducer(mock));
      const reducer = combineReducers({
        ...typePendingReducerSet,
        test: testReducer,
      });
      const store = createStore(reducer, {}, applyMiddleware(typeReduxMiddleware));
      store.dispatch(testAction());
      expect(isPending('PIYO_ACTION', store.getState())).toBeTruthy();
      jest.runAllTimers();
      await promise;
      expect(isPending('PIYO_ACTION', store.getState())).toBeFalsy();
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });

  it('createTypeReduxInitialState', async () => {
    const initialState = createTypeReduxInitialState();
    expect(initialState).toEqual({
      '@@redux-type': {
        pendings: {}
      }
    });
  });

  it('isError true', () => {
    const result = isError<'TEST', {}, 'TEST'>({
      type: 'TEST',
      error: true,
      payload: new Error('TEST'),
      meta: {}
    });
    expect(result).toBeTruthy();
  });

  it('isError false', () => {
    const result = isError<'TEST', {}, 'TEST'>({
      type: 'TEST',
      payload: 'TEST',
      meta: {}
    });
    expect(result).toBeFalsy();
  });

  it('isTypeAsyncAction true by typeAsyncAction', () => {
    const sayAsyncHello = createTypeAsyncAction('HELLO', () => new Promise(resolve => setTimeout(resolve, 100000)));
    const action = sayAsyncHello();
    const result = isTypeAsyncAction(action);
    expect(result).toBeTruthy();
    jest.runAllTimers();
  });

  it('isTypeAsyncAction false by typeAction without async', () => {
    const sayHello = createTypeAction('HELLO', () => { });
    const action = sayHello();
    const result = isTypeAsyncAction(action);
    expect(result).toBeFalsy();
  });

  it('isTypeAsyncAction false by plain action', () => {
    const result = isTypeAsyncAction({
      type: 'PLAIN_ACTION',
      payload: { a: 1 }
    });
    expect(result).toBeFalsy();
  });

  it('middleware', async () => {
    const promise =  new Promise<void>((r) => setTimeout(r, 100000));
    const actionCreator = createTypeAsyncAction('TEST_ACTION', () => promise);
    const reducer = createTypeReducer({}, actionCreator.reducer(r => ({
      a: 123
    })));
    const store = createStore(combineReducers({ ...typePendingReducerSet, test: reducer }), applyMiddleware(typeReduxMiddleware));
    store.dispatch(actionCreator());
    expect(store.getState()).toEqual({
      '@@redux-type': {
        pendings: {
          TEST_ACTION: 1
        },
      },
      test: {}
    });
    jest.runAllTimers();
    await promise;
    expect(store.getState()).toEqual({
      '@@redux-type': {
        pendings: {
          TEST_ACTION: 0
        }
      },
      test: {
        a: 123,
      }
    });
  });
});
