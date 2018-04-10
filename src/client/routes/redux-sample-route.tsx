import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green100, green500, green700 } from 'material-ui/styles/colors';

import TodoApp from '../apps/todo-app';
import TodoList from '../views/todo-list';
import TodoCounter from '../views/todo-counter';
import { NotFound } from '../components/notfound';

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
  const muiTheme = getMuiTheme({
    palette: {
      primary1Color: green500,
      primary2Color: green700,
      primary3Color: green100,
    },
  }, {
    avatar: {
      borderColor: null,
    }
  });

  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={store}>
        <BrowserRouter>
        {renderRoutes(routes)}
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
};

// https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/

export const createServerApp = (req, context, store) => {
  const muiTheme = getMuiTheme({
    palette: {
      primary1Color: green500,
      primary2Color: green700,
      primary3Color: green100,
    },
  }, {
    avatar: {
      borderColor: null,
    },
    userAgent: req.headers['user-agent'],
  });

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <StaticRouter location={req.baseUrl} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    </MuiThemeProvider>
  );
};
