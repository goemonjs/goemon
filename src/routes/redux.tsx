import * as assign from 'object-assign';
import { Express, Router } from 'express';
import * as React from 'react';
import * as Redux from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { matchPath } from 'react-router-dom';

import { configureStore, IStore } from '../client/stores/configure-store';
import { createServerApp, routes } from '../client/routes/redux-sample-route';
import TodoListService from '../client/services/todo-list-service';
import AppServver from '../app-server';
import * as fs from 'fs';

let router = Router();
let jsDate: number = 0;
let cssDate: number = 0;

module.exports = function (app: Express) {
  app.use('/redux', router);

  let path = require('path');
  let rootPath = path.normalize(__dirname + '/..');

  // Calc js modify date
  let jsStats = fs.statSync(rootPath + '/public/js/redux-sample.js');
  jsDate = jsStats.mtime.getFullYear() + jsStats.mtime.getMonth() + jsStats.mtime.getDay() + jsStats.mtime.getTime();
};

router.get('*', (req, res) => {
  let context: any = {};

  const store = configureStore();
  const preloadedState = store.getState();
  const branch = matchRoutes(routes, req.baseUrl + req.url);
  const protocol = req.protocol;
  let host = req.host;
  if ( host == 'localhost') {
    host += ':' + AppServver.config.port;
  }
  const promises = branch.map(({route}) => {
    let fetchData = route.component.fetchData;
    return fetchData instanceof Function ? fetchData(store, protocol, host) : Promise.resolve(undefined);
  });
  return Promise.all(promises).then((data) => {
    let context: any = {};
    const content = renderToString(createServerApp(req, context, store));

    if ( context.status === 404) {
      res.status(404);
    } else if (context.status === 302) {
      return res.redirect(302, context.url);
    }

    res.render('redux', {
      title: 'EJS Server Rendering Title',
      markup: content,
      initialState: JSON.stringify(store.getState()),
      jsDate: jsDate
    });
  });
});
