import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
var fetch = require('node-fetch');

import SimpleApp from '../client/apps/simple-app';

let router = express.Router();

module.exports = function (app:express.Express) {
  app.use('/simple', router);
};

router.get('/', renderHandler);

function renderHandler(req, res, next) {

  let host =  req.headers.host;
  let url = 'http://' + host + '/api/items';

  getItems(url, (items) => {
    const initialProps = { items };
    const markup = renderToString(<SimpleApp { ...initialProps } />);

    res.render('simple', {
      title: 'React Simple Server Rendering Sample',
      markup: markup,
      initialState: JSON.stringify(initialProps)
    });
  });
}

function getItems(url, callback) {
  fetch(url)
  .then(apiResult => apiResult.json())
  .then(items => {
    callback(items);
  }).catch(error => {
    console.log(error);
    throw error;
  });
}
