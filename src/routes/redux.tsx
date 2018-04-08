import { Express, Router } from 'express';
import * as React from 'react';
import * as Redux from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { matchPath } from 'react-router-dom';
import assign = require('object-assign');
import { configureStore, IStore } from '../client/stores/configure-store';
import { createServerApp } from '../client/routes/redux-sample-route';
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

router.get('/', (req, res) => {
  let context: any = {};

  const initialState: IStore = {
    todoState : {
      message : 'Hello initial state! from server',
      todos: [],
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
    const app = createServerApp(req, context, store);
    const markup = renderToString(app);
    const preloadedState = store.getState();

    if ( context.url ) {
      res.writeHead(302, {
        Location: context.url
      });
      res.end();
    } else {
      res.render('redux', {
        title: 'EJS Server Rendering Title',
        markup: markup,
        initialState: JSON.stringify(preloadedState),
        jsDate: jsDate
      });
  }

});

// function renderHandler(req, res, next) {
//   const initialState: IStore = {
//     todoState : {
//       message : 'Hello initial state! from server',
//       todos: [],
//       isFetching: false
//     },
//     profileState : {
//       profile : {
//         name : 'No name'
//       }
//     }
//   };

//   // Rendering
//   const store = configureStore(initialState);
//   const app = createServerApp(req, context, store);
//   const markup = renderToString(app);
//   const preloadedState = store.getState();

//   res.render('redux', {
//     title: 'EJS Server Rendering Title',
//     markup: markup,
//     initialState: JSON.stringify(preloadedState),
//     jsDate: jsDate
//   });
// }
