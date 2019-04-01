/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

export function createClientApp(componant, store, basename) {
  return (
    <Provider store={store}>
      <BrowserRouter basename={basename}>
          {componant}
      </BrowserRouter>
    </Provider>
  );
}


// Render the component to a string.
export function renderOnServer(componant, req, context, store) {

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.baseUrl + req.url} context={context}>
        {componant}
      </StaticRouter>
    </Provider>
  );

  return {
    html: html
  };
}

 // Grab the CSS from our sheetsRegistry.
