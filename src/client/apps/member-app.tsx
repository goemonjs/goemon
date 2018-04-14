import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Link, match } from 'react-router-dom';
import MemberView from '../views/member';
import Profile from '../views/profile';

interface IProps  {
  match: any;
}

interface IState {
  hasError: boolean;
}

export default class MemberApp extends React.Component<IProps, IState> {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render () {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.url}`} component={MemberView} />
        <Route exact path={`${match.url}/profile`} component={Profile} />
      </Switch>
    );
  }

  // render() {
  //   return <MemberView />;
  // }
}
