/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as config from 'react-global-configuration';
import { configureStore } from './stores/member-store';
import { createClientApp } from './base/common/route';
// import { createClientApp } from './base/react/material-ui-app-creator';
import { RouteComponent } from './routes/member-route';
import { defaultConfig } from './config/default';
import { UserContext, IContextProps } from './context/user-context';
import { theme } from './themes/material-ui-lightblue';

const win: any = window;
const preloadedState = win.__PRELOADED_STATE__;
const preloadConfig = win.__CONFIG__;
config.set(Object.assign(defaultConfig, preloadConfig));

const store = configureStore(preloadedState);
const userContext: IContextProps = {
  userType: 'member',
};
const app = createClientApp(
  <UserContext.Provider value={userContext}>
    <RouteComponent />
  </UserContext.Provider>
  , theme, store);

ReactDOM.hydrate(app, document.getElementById('app'));
