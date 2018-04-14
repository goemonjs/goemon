import * as ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from './stores/configure-store';
import { createClientApp } from '../client/base/common/route';
import { routes, theme } from '../client/routes/member-sample-route';

const win: any = window;
const preloadedState = win.__PRELOADED_STATE__;

const store = configureStore(preloadedState);
const app = createClientApp(routes, theme, store);

ReactDOM.render(app, document.getElementById('app'));
