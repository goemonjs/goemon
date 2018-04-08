import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TodoApp from '../apps/todo-app';
import TodoList from '../views/todo-list';
import TodoCounter from '../views/todo-counter';

export const createClientApp = (store) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={store}>
        <BrowserRouter>
        <Switch>
          <Route path="/redux" component={TodoApp} />
          <Route path="/about" component={TodoApp} />
        </Switch>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
};

export const createServerApp = (req, context, store) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
        <Switch>
          <Route path="/redux" component={TodoApp} />
        </Switch>
        </StaticRouter>
      </Provider>
    </MuiThemeProvider>
  );
};
