import { Express, Router } from 'express';
import * as React from 'react';
import * as Redux from 'redux';
import { Provider } from 'react-redux';
import { match } from 'react-router';
import { renderToString } from 'react-dom/server';
import assign = require('object-assign');
import { configureStore, IStore } from '../client/stores/configure-store';
import { routes, createServerApp } from '../client/routes/redux-sample-route';
import TodoListService from '../client/services/todo-list-service';
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

router.get('/', renderHandler);

function renderHandler(req, res, next) {

  // res.header('Cache-Control', 'public, max-age=10000'); // 10s

  // Match route
  match({
    routes,
    location: req.url
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      // When errory
      next(err);
    } else if (redirectLocation) {
      // When redirect
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {

      let host =  req.headers.host;
      let protocol = (('https:' == req.protocol) ? 'https://' : 'http://');
      let url = protocol + host + '/api/todos';

      TodoListService.url = url;
      TodoListService.getTodos().then((todos: any) => {

        const initialState: IStore = {
          todoState : {
            message : 'Hello initial state! from server',
            todos: todos,
            isFetching: false
          },
          profileState : {
            profile : {
              name : 'No name'
            }
          }
        };

        // Rendering
        const store = configureStore(initialState);
        const app = createServerApp(store, renderProps);
        const markup = renderToString(app);
        const preloadedState = store.getState();

        res.render('redux', {
          title: 'EJS Server Rendering Title',
          markup: markup,
          initialState: JSON.stringify(preloadedState),
          jsDate: jsDate
        });
      })
      .catch( error => {
        console.log(error);
        let err: any = new Error('System Error');
        err.status = 500;
        err.stack = error.stack;
        next(err);
      } );

    } else {
      // Not Found
      let err: any = new Error('Not Found');
      err.status = 404;
      next(err);
    }
  });
}
