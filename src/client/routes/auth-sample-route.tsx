import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AuthApp from '../apps/auth-app';
import Profile from '../views/profile';

export const routes = (
  <Switch>
    <Route path="/" component={AuthApp} />
    <Route path="/" component={Profile} />
  </Switch>
);

export const createClientApp = (store) => {
  return (
  <Provider store={store}>
    <BrowserRouter>{routes}</BrowserRouter>
  </Provider>);
};

export const createServerApp = (req, context, store) => {
  return (
    <Provider store={store}>
    <StaticRouter location={req.url} context={context}>
      {routes}
    </StaticRouter>
    </Provider>
  );
};
