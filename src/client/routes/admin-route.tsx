import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { createMuiTheme } from '@material-ui/core/styles';
import MemberView from '../views/member-top';
import { NotFound } from '../views/components/notfound';
import { lightBlue, red  } from '@material-ui/core/colors';

interface IProps  {
  // routes: any;
}

interface IState {
  hasError: boolean;
}

export const routes = [
  {
    path: '/admin',
    component: MemberView,
    exact: true
  }, {
    path: '/admin/*',
    component: NotFound
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
