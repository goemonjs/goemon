import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { GuestTop } from '../views/guest-top';
import { GuestReact } from '../views/guest-react';
import { GuestRedux } from '../views/guest-redux';
import { NotFound } from '../views/components/notfound';

interface IProps  {
  // routes: any;
}

interface IState {
  hasError: boolean;
}

export const routes = [
  {
    path: '/',
    component: GuestTop,
    exact: true
  },  {
    path: '/react',
    component: GuestReact,
    exact: false
  },  {
    path: '/redux',
    component: GuestRedux,
    exact: false
  }, {
    path: '/redux/counter',
    component: GuestRedux,
    exact: false
  }, {
    path: '*',
    component: NotFound,
    exact: false
  }
];

export class RouteComponent extends React.Component<IProps, IState> {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render () {
    // const { match } = this.props;
    return (
      renderRoutes(routes)
    );
  }
}
