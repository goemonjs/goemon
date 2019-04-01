import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { createMuiTheme } from '@material-ui/core/styles';
import MemberTop from '../views/member-top';
import Profile from '../views/profile';
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
    path: '/member',
    component: MemberTop,
    exact: true
  }, {
    path: '/member/login',
    component: MemberTop,
    exact: true
  }, {
    path: '/member/profile',
    component: Profile,
    exact: true
  },
   {
    path: '/member/*',
    component: NotFound
  }
];

export const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    grey: red,
    type: 'light'
  },
  typography: {
    useNextVariants: true,
  },
});

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
