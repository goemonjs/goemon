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
import i18n from './localization/i18n';

initConfig();
const initialState = getInitialState();
const store = configureStore(initialState);
const userContext: IContextProps = {
  userType: 'member',
};

const app = (
  <ErrorBoundary>
    <MaterialUiAppContainer i18n={i18n} store={store} context={userContext} theme={theme}>
      <RouteComponent />
    </MaterialUiAppContainer>
  </ErrorBoundary>
);

ReactDOM.hydrate(app, document.getElementById('app'));
