/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';
import config from 'react-global-configuration';
import { configureStore } from './stores/member-store';
import { MaterialUiAppContainer } from './base/react/material-ui-app-container';
import { RouteComponent } from './routes/admin-route';
import { initConfig, getInitialState } from './base/react/app-initializer';
import { UserContext, IContextProps } from './context/user-context';
import { theme } from './themes/material-ui-red';

initConfig();
const store = configureStore(getInitialState());
const userContext: IContextProps = {
  userType: 'admin',
};
const app = (
  <MaterialUiAppContainer store={store} context={userContext} theme={theme}>
    <RouteComponent />
  </MaterialUiAppContainer>
);

ReactDOM.hydrate(app, document.getElementById('app'));
