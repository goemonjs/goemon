/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Lunascape Corporation. All rights reserved.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as config from 'react-global-configuration';
import { configureStore } from './stores/member-store';
import { RouteComponent } from './routes/guest-route';
import { defaultConfig } from './config/default';
import { UserContext, IContextProps } from './context/user-context';
import { AppContainer } from './base/react/app-container';

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
  userType: 'guest',
};

const app = (
  <AppContainer store={store} context={userContext}>
    <RouteComponent />
  </AppContainer>
);

ReactDOM.hydrate(app, document.getElementById('app'));
