import * as React from 'react';
import { Router } from 'express';
import { configureStore } from '../client/stores/member-store';
import { RouteComponent, routes } from '../client/apps/member-route';
import { theme } from '../client/themes/material-ui-lightblue';
import { Renderer } from './base/route-base';
import * as passport from 'passport';

const router = Router();
const store = configureStore();

let renderer =  new Renderer(store, RouteComponent, routes, theme);

module.exports = (app) => {
  app.use('/member', router);
};

router.get('/login',  (req: any, res, next) => {
  res.render('member-login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local',
  { successRedirect: '/member', failureRedirect: '/member/login', failureFlash: true }
));

router.get('/logout', (req: any, res) => {
  req.logout();
  res.redirect('/member');
});

router.get('*', isAuthenticated, (req, res) => {
  renderer.ssrRouteHandler(req, res, 'member', { title: 'Member - Goemon', userid: req.user.email});
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/member/login');
}
