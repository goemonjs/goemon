import * as React from 'react';
import { Router } from 'express';
import { configureStore } from '../client/stores/member-store';
import { RouteComponent, routes } from '../client/routes/member-route';
import { ServerSideRenderer } from './utilities/ssr-renderer';
import { MaterialUiAppContainer } from '../client/base/react/material-ui-app-container';
import { SheetsRegistry } from 'react-jss/lib/jss';
import { theme } from '../client/themes/material-ui-lightblue';
import * as passport from 'passport';

const router = Router();
const store = configureStore();

let renderer =  new ServerSideRenderer('/js/admin.js', store);

module.exports = (app) => {
  app.use('/admin', router);
};

router.get('/login',  (req: any, res, next) => {
  res.render('admin-login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local',
  { successRedirect: '/admin', failureRedirect: '/admin/login', failureFlash: true }
));

router.get('/logout', (req: any, res) => {
  req.logout();
  res.redirect('/admin');
});

router.get('*', isAuthenticated, (req, res) => {
  const sheetsRegistry = new SheetsRegistry();
  const app = (
    <MaterialUiAppContainer store={store} location={req.baseUrl + req.url} theme={theme} sheetsRegistry={sheetsRegistry}>
      <RouteComponent />
    </MaterialUiAppContainer>
  );

  const cssGenerator = () => {
    return sheetsRegistry.toString();
  };

  renderer.render(req, res, 'member', { title: 'Member - Goemon' }, app, cssGenerator);
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if ( req.user.roles.indexOf('admin') > -1 ) {
      return next();
    } else {
      res.status(401);
      res.render('error', {
          message: 'Unauthorized',
          error: {}
      });
    }
  }
  res.redirect('/admin/login');
}
