import React from 'react';
import { Express, Router } from 'express';
import { configureStore } from '../client/stores/guest-store';
import { AppContainer } from '../client/base/react/app-container';
import { RouteComponent, routes } from '../client/routes/guest-route';
import { ServerSideRenderer } from './utilities/ssr-renderer';
import { renderToString } from 'react-dom/server';
import i18nMiddleware from 'i18next-express-middleware';
import i18n from '../client/localization/i18n';

const router = Router();

const renderer = new ServerSideRenderer('guest.js');

module.exports = function (app: Express) {
  // To avoid react-router error on production mode, we need to set the middleware at here
  app.use(i18nMiddleware.handle(i18n));

  app.use('/', router);
};

router.get('/', authenticationHandler, (req, res) => {
  const store = configureStore();
  renderer.render(req, res, 'guest', { title: 'Home' }, store, htmlGenerator);
});

router.get('/react', authenticationHandler, (req, res) => {
  const store = configureStore();
  renderer.render(req, res, 'guest', { title: 'React' }, store, htmlGenerator);
});

router.get('/redux', authenticationHandler, (req, res) => {
  const store = configureStore();
  renderer.renderWithInitialProps(req, res, 'guest', { title: 'Redux' }, store, routes, htmlGenerator);
});

router.get('/redux/counter', authenticationHandler, (req, res) => {
  const store = configureStore();
  renderer.render(req, res, 'guest', { title: 'Redux' }, store, htmlGenerator);
});

router.get('/about', authenticationHandler, (req, res) => {
  res.render('about', { title: 'About' });
});

router.get('/login', (req: any, res, next) => {
  res.render('login', { message: req.flash('error') });
});

const htmlGenerator = (req, store, i18n) => {
  return renderToString(
    <AppContainer store={store} location={req.baseUrl + req.url} i18n={i18n}>
      <RouteComponent />
    </AppContainer>
  );
};

function authenticationHandler(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/member');
  }
  return next();
}
