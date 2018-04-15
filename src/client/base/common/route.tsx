import * as React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles';

interface IProps  {
  store: any;
  theme: any;
  match: any;
}

interface IState {
  hasError: boolean;
}

export function createClientApp(componant, theme, store) {

  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  const generateClassName = createGenerateClassName();

  return (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
             {componant}
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  );
}

// Render the component to a string.
export function renderOnServer(componant, theme, req, context, store) {

  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  const generateClassName = createGenerateClassName();

  const html = renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <Provider store={store}>
          <StaticRouter location={req.baseUrl} context={context}>
            {componant}
          </StaticRouter>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  );

  const css = sheetsRegistry.toString();

  return {
    html: html,
    css: css
  };
}

 // Grab the CSS from our sheetsRegistry.
