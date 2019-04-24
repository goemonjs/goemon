import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import AdminTop from '../views/admin-top';
import { NotFound } from '../views/components/notfound';

interface IProps  {
  // routes: any;
}

interface IState {
  hasError: boolean;
}

export const routes = [
  {
    path: '/admin',
    component: AdminTop,
    exact: true
  }, {
    path: '/admin/*',
    component: NotFound
  }
];

export class RouteComponent extends React.Component<IProps, IState> {
  render () {
    // const { match } = this.props;
    return (
      renderRoutes(routes)
    );
  }
}
