import * as React from 'react';
import { Router, Route, IndexRoute, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import TodoApp from '../apps/todo-app';
import TodoList from '../views/todo-list';
import TodoCounter from '../views/todo-counter';

export const routes = (
  <Route path="/" component={TodoApp} >
    <IndexRoute component={TodoList} />
    <Route path="/counter" component={TodoCounter} />
  </Route>
);

export const createClientApp = (store, history) => {
  return (<Provider store={store}><Router history={history}>{routes}</Router></Provider>);
};

export const createServerApp = (store, props) => {
  return (<Provider store={store}><RouterContext {...props}/></Provider>);
};
