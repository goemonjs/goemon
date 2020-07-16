import React from 'react';
import { Router } from 'express';
import { configureStore, InitialState } from '../client/stores/member-store';
import { RouteComponent, routes } from '../client/routes/member-route';
import { ServerSideRenderer } from './utilities/ssr-renderer';
import { MaterialUiAppContainer } from '../client/base/react/material-ui-app-container';
import { theme } from '../client/themes/material-ui-lightblue';
import passport from 'passport';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/core/styles';
import i18nMiddleware from 'i18next-express-middleware';
import i18n from '../client/localization/i18n';

const router = Router();

let renderer = new ServerSideRenderer('admin.js');

module.exports = (app) => {
  // To avoid react-router error on production mode, we need to set the middleware at here
  app.use(i18nMiddleware.handle(i18n));

  app.use('/admin', router);
};

router.get('/login', (req: any, res, next) => {
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
  let initialState = InitialState;
  if (req.user) {
    const user: any = req.user;
    initialState.memberState.displayName = user.displayName;
  }
  const sheets = new ServerStyleSheets();
  const htmlGenerator = (req, store, i18n) => {
    return renderToString(
      sheets.collect(
        <MaterialUiAppContainer i18n={i18n} store={store} location={req.baseUrl + req.url} theme={theme}>
          <RouteComponent />
        </MaterialUiAppContainer>
      )
    );
  };

  const cssGenerator = () => {
    return sheets.toString();
  };

  renderer.render(req, res, 'member', { title: 'Member - Goemon' }, htmlGenerator, cssGenerator);
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.roles.indexOf('admin') > -1) {
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
