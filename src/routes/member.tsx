import React from 'react';
import { Router } from 'express';
import { configureStore } from '../client/stores/member-store';
import { MaterialUiAppContainer } from '../client/base/react/material-ui-app-container';
import { RouteComponent, routes } from '../client/routes/member-route';
import { theme } from '../client/themes/material-ui-lightblue';
import { ServerSideRenderer } from './utilities/ssr-renderer';
import { SheetsRegistry } from 'react-jss/lib/jss';
import passport from 'passport';

const router = Router();
const store = configureStore();

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
  const component = (
    <MaterialUiAppContainer store={store} location={req.baseUrl + req.url} theme={theme} sheetsRegistry={sheetsRegistry}>
      <RouteComponent />
    </MaterialUiAppContainer>
  );

  const cssGenerator = () => {
    return sheetsRegistry.toString();
  };

  renderer.render(req, res, 'member', { title: 'Member - Goemon' }, component, cssGenerator);
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
