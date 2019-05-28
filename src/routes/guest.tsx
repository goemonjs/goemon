import React from 'react';
import { Express, Router } from 'express';
import { configureStore } from '../client/stores/guest-store';
import { AppContainer } from '../client/base/react/app-container';
import { RouteComponent, routes } from '../client/routes/guest-route';
import { ServerSideRenderer } from './utilities/ssr-renderer';
import * as TodoAction from '../client/actions/todo-actions';

const router = Router();

const renderer = new ServerSideRenderer('guest.js');

module.exports = function (app: Express) {
  app.use('/', router);
};

router.get('/', authenticationHandler, (req, res) => {
  const store = configureStore();
  renderer.render(req, res, 'guest', { title: 'Home' }, store, component);
});

router.get('/react', authenticationHandler, (req, res) => {
  const store = configureStore();
  renderer.render(req, res, 'guest', { title: 'React' }, store, component);
});

router.get('/redux', authenticationHandler, (req, res) => {
  const store = configureStore();
  renderer.renderWithInitialProps(req, res, 'guest', { title: 'Redux' }, store, component, routes);
});

router.get('/redux/counter', authenticationHandler, (req, res) => {
  const store = configureStore();
  renderer.render(req, res, 'guest', { title: 'Redux' }, store, component);
});

router.get('/about', authenticationHandler, (req, res) => {
  res.render('about', { title: 'About' });
});

router.get('/login', (req: any, res, next) => {
  res.render('login', { message: req.flash('error') });
});

function component(req, store, i18n) {
  return (
    <AppContainer store={store} location={req.baseUrl + req.url} i18n={i18n}>
      <RouteComponent />
    </AppContainer>
  );
}

function authenticationHandler(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/member');
  }
  return next();
}
