import * as React from 'react';
import { Router, Route, IndexRoute, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import AuthApp from '../apps/auth-app';
import Profile from '../views/profile';

export const routes = (
  <Route path="/" component={AuthApp} >
    <IndexRoute component={Profile} />
  </Route>
);

export const createClientApp = (store, history) => {
  return (<Provider store={store}><Router history={history}>{routes}</Router></Provider>);
};

export const createServerApp = (store, props) => {
  return (<Provider store={store}><RouterContext {...props}/></Provider>);
};
