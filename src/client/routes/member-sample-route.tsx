import * as React from 'react';
import { Route, Switch } from 'react-router';
import { createMuiTheme } from 'material-ui/styles';
import { lightBlue, red  } from 'material-ui/colors';

import MemberApp from '../apps/member-app';
import Profile from '../views/profile';
import { NotFound } from '../components/notfound';

export const routes = [
  {
    path: '/member/',
    component: MemberApp,
    exact: true
  }, {
    path: '/member/profile',
    component: Profile,
    exact: true
  }, {
    path: '/*',
    component: NotFound
  }
];

export const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    type: 'light'
  },
});

 // Grab the CSS from our sheetsRegistry.
