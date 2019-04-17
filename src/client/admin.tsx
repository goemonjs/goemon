/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as config from 'react-global-configuration';
import { configureStore } from './stores/member-store';
import { createClientApp } from './base/common/route';
// import { createClientApp } from './base/react/material-ui-app-creator';
import { RouteComponent } from './routes/admin-route';
import { defaultConfig } from './config/default';
import { UserContext, IContextProps } from './context/user-context';
import { theme } from './themes/material-ui-red';

const win: any = window;
const preloadConfig = win.__CONFIG__;
Object.assign(defaultConfig, {
  protocol:  (('https:' == document.location.protocol) ? 'https://' : 'http://'),
  host: location.host
});
Object.assign(defaultConfig, preloadConfig);

config.set(defaultConfig);
const preloadedState = win.__PRELOADED_STATE__;

const store = configureStore(preloadedState);
const userContext: IContextProps = {
  userType: 'admin',
};
const app = createClientApp(
  <UserContext.Provider value={userContext}>
    <RouteComponent />
  </UserContext.Provider>
  , theme, store);

ReactDOM.hydrate(app, document.getElementById('app'));
