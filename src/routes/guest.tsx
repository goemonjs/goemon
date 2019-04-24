import * as React from 'react';
import { Express, Router } from 'express';
import { configureStore } from '../client/stores/guest-store';
import { AppContainer } from '../client/base/react/app-container';
import { RouteComponent } from '../client/routes/guest-route';
import { ServerSideRenderer } from './utilities/ssr-renderer';

const router = Router();
const store = configureStore();
const renderer = new ServerSideRenderer('guest.js');

module.exports = function (app: Express) {
  app.use('/', router);
};

router.get('/', authenticationHandler, (req, res) => {
  // const app = (location) => { return (
  //   <AppContainer store={store} location={location}>
  //     <RouteComponent />
  //   </AppContainer>
  // ); };
  const app = (
    <AppContainer store={store} location={req.baseUrl + req.url}>
      <RouteComponent />
    </AppContainer>
  );
  renderer.render(req, res, 'guest', { title: 'Home'}, app);
});

router.get('/react', authenticationHandler, (req, res) => {
  const app = (
    <AppContainer store={store} location={req.baseUrl + req.url}>
      <RouteComponent />
    </AppContainer>
  );
  renderer.render(req, res, 'guest', { title: 'React'}, app);
});

router.get('/redux', authenticationHandler, (req, res) => {
  const app = (
    <AppContainer store={store} location={req.baseUrl + req.url}>
      <RouteComponent />
    </AppContainer>
  );
  renderer.render(req, res, 'guest', { title: 'Redux'}, app);
});

router.get('/redux/counter', authenticationHandler, (req, res) => {
  const app = (
    <AppContainer store={store} location={req.baseUrl + req.url}>
      <RouteComponent />
    </AppContainer>
  );
  renderer.render(req, res, 'guest', { title: 'Redux'}, app);
});

router.get('/about', authenticationHandler, (req, res) => {
  res.render('about', { title: 'About'});
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
