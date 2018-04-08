import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';

import SimpleApp from './apps/simple-app';

let win: any = window;
const props = win.__PRELOADED_STATE__;
ReactDOM.render(<SimpleApp { ...props } />, document.getElementById('app')); //
