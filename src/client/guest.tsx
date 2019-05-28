/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';

import { configureStore } from './stores/member-store';
import { RouteComponent } from './routes/guest-route';

import { UserContext, IContextProps } from './context/user-context';
import { initConfig, getInitialState } from './base/app/app-initializer';
import { AppContainer } from './base/react/app-container';
import { ErrorBoundary } from './base/react/error-boundary';
import i18n from './localization/i18n';

initConfig();
const store = configureStore(getInitialState());
const userContext: IContextProps = {
  userType: 'guest',
};

const app = (
  <ErrorBoundary>
    <AppContainer i18n={i18n} store={store} context={userContext}>
      <RouteComponent />
    </AppContainer>
  </ErrorBoundary>
);

ReactDOM.hydrate(app, document.getElementById('app'));
