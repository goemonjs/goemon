import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import SimpleApp from './apps/simple-app';

var win:any = window;
const props = win.__PRELOADED_STATE__;
ReactDOM.render(<SimpleApp { ...props } />, document.getElementById('app')); //
