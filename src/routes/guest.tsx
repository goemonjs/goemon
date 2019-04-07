import * as React from 'react';
import { Express, Router } from 'express';
import { configureStore } from '../client/stores/guest-store';
import { RouteComponent, routes } from '../client/routes/guest-route';
import { theme } from '../client/themes/material-ui-lightblue';
import { Renderer } from './base/route-base';
import * as ReactDOMServer from 'react-dom/server';
import { app }  from '../client/guest';

const router = Router();
const store = configureStore();

let renderer =  new Renderer(store, RouteComponent, routes, theme);

module.exports = function (app: Express) {
  app.use('/', router);
};

router.get('/', authenticationHandler, (req, res) => {
  renderer.ssrRouteHandler(req, res, 'guest', { title: 'Home'});
});

router.get('/react', authenticationHandler, (req, res) => {
  renderer.ssrRouteHandler(req, res, 'guest', { title: 'React'});
});

router.get('/redux', authenticationHandler, (req, res) => {
  renderer.ssrRouteHandler(req, res, 'guest', { title: 'Redux'});
});

router.get('/redux/counter', authenticationHandler, (req, res) => {
  renderer.ssrRouteHandler(req, res, 'guest', { title: 'Redux'});
});

router.get('/about', authenticationHandler, (req, res) => {
  res.render('guest', { title: 'About'});
});

router.get('/login',  (req: any, res, next) => {
  res.render('login', { message: req.flash('error') });
});

function authenticationHandler(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/member');
  }
  return next();
}
