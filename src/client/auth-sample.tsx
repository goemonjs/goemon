import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import { configureStore } from './stores/configure-store';
import { createClientApp } from './routes/auth-sample-route';

const win: any = window;
const preloadedState = win.__PRELOADED_STATE__;

const store = configureStore(preloadedState);
const app = createClientApp(store, hashHistory);

ReactDOM.render(app, document.getElementById('app'));
