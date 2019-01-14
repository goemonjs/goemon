import * as ReactDOM from 'react-dom';
import { configureStore } from './stores/configure-store';
import { createClientApp } from './routes/redux-sample-route';

const win: any = window;
const preloadedState = win.__PRELOADED_STATE__;

const store = configureStore(preloadedState);
const app = createClientApp(store);

ReactDOM.hydrate(app, document.getElementById('app'));
