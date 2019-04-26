/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import  React from 'react';
import ReactDOM from 'react-dom';

import { configureStore } from './stores/member-store';
import { RouteComponent } from './routes/guest-route';

import { UserContext, IContextProps } from './context/user-context';
import { initConfig, getInitialState } from './base/react/app-initializer';
import { AppContainer } from './base/react/app-container';

initConfig();
const store = configureStore(getInitialState());
const userContext: IContextProps = {
  userType: 'guest',
};

const app = (
  <AppContainer store={store} context={userContext}>
    <RouteComponent />
  </AppContainer>
);

ReactDOM.hydrate(app, document.getElementById('app'));
