import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import TodoApp from '../apps/todo-app';
import TodoList from '../views/todo-list';
import TodoCounter from '../views/todo-counter';
import { NotFound } from '../views/components/notfound';

export const routes = [
  {
    path: '/redux',
    component: TodoApp,
  }, {
    path: '/about',
    component: TodoApp
  }, {
    path: '/*',
    component: NotFound
  }
];

export const routeServer = [
  { component: TodoApp,
    routes: [
      { path: '/redux',
        component: TodoApp
      }
    ]
  }
];

export const createClientApp = (store) => {

  return (
      <Provider store={store}>
        <BrowserRouter>
        {renderRoutes(routes)}
        </BrowserRouter>
      </Provider>
  );
};

// https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/

export const createServerApp = (req, context, store) => {

  return (
      <Provider store={store}>
        <StaticRouter location={req.baseUrl} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
  );
};
