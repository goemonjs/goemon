/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './stores/member-store';
import { MaterialUiAppContainer } from './base/react/material-ui-app-container';
import { RouteComponent } from './routes/member-route';
import { initConfig, getInitialState } from './base/app/app-initializer';
import { UserContext, IContextProps } from './context/user-context';
import { theme } from './themes/material-ui-lightblue';
import { ErrorBoundary } from './base/react/error-boundary';

initConfig();
const store = configureStore(getInitialState());
const userContext: IContextProps = {
  userType: 'member',
};

const app = (
  <ErrorBoundary>
    <MaterialUiAppContainer store={store} context={userContext} theme={theme}>
      <RouteComponent />
    </MaterialUiAppContainer>
  </ErrorBoundary>
);

ReactDOM.hydrate(app, document.getElementById('app'));
