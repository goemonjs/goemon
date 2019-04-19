import * as React from 'react';
import { Router } from 'express';
import { configureStore } from '../client/stores/member-store';
import { RouteComponent, routes } from '../client/routes/member-route';
import { theme } from '../client/themes/material-ui-lightblue';
import { Renderer } from './base/route-base';
import * as passport from 'passport';

const router = Router();
const store = configureStore();

let renderer =  new Renderer(store, RouteComponent, routes, theme);

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
  renderer.ssrRouteHandler(req, res, 'admin', { title: 'Admin - Goemon', userid: req.user.email});
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
