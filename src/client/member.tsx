/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configureStore } from './stores/member-store';
import { MaterialUiAppContainer } from './base/react/material-ui-app-container';
import { RouteComponent } from './routes/member-route';
import { initConfig, getInitialState } from './base/react/app-initializer';
import { UserContext, IContextProps } from './context/user-context';
import { theme } from './themes/material-ui-lightblue';

initConfig();
const store = configureStore(getInitialState());
const userContext: IContextProps = {
  userType: 'member',
};
const app = (
  <MaterialUiAppContainer store={store} context={userContext} theme={theme}>
    <RouteComponent />
  </MaterialUiAppContainer>
);

ReactDOM.hydrate(app, document.getElementById('app'));
