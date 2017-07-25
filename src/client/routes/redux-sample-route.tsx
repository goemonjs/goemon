import * as React from 'react';
import { Router, Route, IndexRoute, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export const createServerApp = (store, props) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Provider store={store}>
        <RouterContext {...props}/>
      </Provider>
    </MuiThemeProvider>
  );
};
