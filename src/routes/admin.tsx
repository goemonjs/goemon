import * as React from 'react';
import { Express, Router } from 'express';
import * as fs from 'fs';

import { renderToString } from 'react-dom/server';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { matchPath } from 'react-router-dom';
import PassportUtility from '../middlewares/passport/passport-utility';
import { configureStore, IStore } from '../client/stores/configure-store';
import { renderOnServer } from '../client/base/common/route';
import { MemberApp, routes, theme } from '../client/apps/member-app';

const passport = require('passport');
const router = Router();
let jsDate: number = 0;

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
  let context: any = {};
  const protocol = req.protocol;
  let host = req.headers.host;

  const store = configureStore();
  const preloadedState = store.getState();

  // getInitalProps
  const branch = matchRoutes(routes, req.baseUrl + req.url);
  const promises = branch.map(({route}) => {
    let getInitialProps = route.component.getInitialProps;
    return getInitialProps instanceof Function ? getInitialProps(store, protocol, host) : Promise.resolve(undefined);
  });
  return Promise.all(promises).then((data) => {
    // render on server side
    let context: any = {};

    let contents = renderOnServer(<MemberApp />, theme, req, context, store);

    if ( context.status === 404) {
      res.status(404);
    } else if (context.status === 302) {
      return res.redirect(302, context.url);
    }

    res.render('member', {
      userid: PassportUtility.getUserId(req),
      title: 'EJS Server Rendering Title',
      html: contents.html,
      css: contents.css,
      initialState: JSON.stringify(store.getState()),
      jsDate: jsDate
    });

  });
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if ( req.session.passport.user.admin ) {
      return next();
    } else {
      res.redirect('/admin/login');
    }
  }
  res.redirect('/admin/login');
}
