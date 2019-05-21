import React from 'react';
import { Router } from 'express';
import { configureStore, InitialState } from '../client/stores/member-store';
import { MaterialUiAppContainer } from '../client/base/react/material-ui-app-container';
import { RouteComponent, routes } from '../client/routes/member-route';
import { theme } from '../client/themes/material-ui-lightblue';
import { ServerSideRenderer } from './utilities/ssr-renderer';
import { SheetsRegistry } from 'react-jss/lib/jss';
import passport from 'passport';

const router = Router();

let renderer = new ServerSideRenderer('member.js');

module.exports = (app) => {
  app.use('/member', router);
};

router.post('/login', passport.authenticate('local',
  { successRedirect: '/member/', failureRedirect: '/member/login', failureFlash: true }
));

router.get('/logout', (req: any, res) => {
  req.logout();
  res.redirect('/member/');
});

router.get('*', isAuthenticated, (req, res) => {
  const sheetsRegistry = new SheetsRegistry();

  // Set initial state of store
  let initialState = InitialState;
  initialState.memberState.displayName = req.user.displayName;
  const store = configureStore(InitialState);

  // Component
  const component = (
    <MaterialUiAppContainer store={store} location={req.baseUrl + req.url} theme={theme} sheetsRegistry={sheetsRegistry}>
      <RouteComponent />
    </MaterialUiAppContainer>
  );

  const cssGenerator = () => {
    return sheetsRegistry.toString();
  };

  renderer.renderWithInitialProps(req, res, 'member', { title: 'Member - Goemon' }, component, routes, store, cssGenerator);
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
