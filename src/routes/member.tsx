import React from 'react';
import passport from 'passport';
import { Router } from 'express';
import { configureStore, InitialState } from '../client/stores/member-store';
import { MaterialUiAppContainer } from '../client/base/react/material-ui-app-container';
import { RouteComponent, routes } from '../client/routes/member-route';
import { theme } from '../client/themes/material-ui-lightblue';
import { ServerSideRenderer } from './utilities/ssr-renderer';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheets } from '@material-ui/core/styles';
import i18nMiddleware from 'i18next-express-middleware';
import i18n from '../client/localization/i18n';

const router = Router();

let renderer = new ServerSideRenderer('member.js');

module.exports = (app) => {
  // To avoid react-router error on production mode, we need to set the middleware at here
  app.use(i18nMiddleware.handle(i18n));

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
  // Set initial state of store
  let initialState = InitialState;
  if (req.user) {
    const user: any = req.user;
    initialState.memberState.displayName = user.displayName;
  }
  const store = configureStore(InitialState);
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

  renderer.renderWithInitialProps(req, res, 'member', { title: 'Member - Goemon' }, store, routes, htmlGenerator, cssGenerator);
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
