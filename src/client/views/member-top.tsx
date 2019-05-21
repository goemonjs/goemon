import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';

// Material UI style difinition
import { withStyles, createStyles, Theme, StyleRules } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import * as AuthActions from '../actions/auth-actions';
import * as ProfileActions from '../actions/profile-actions';
import FormSample from './parts/member/form-sample';
import PageSample from './parts/member/page-sample';
import Profile from './parts/member/profile';

import { IStore } from '../stores/member-store';

// Styles
import { styles } from '../themes/material-ui-lightblue';

import { sideMenus } from './parts/member/side-menu';

interface IProps extends React.Props<{}>, RouteComponentProps<{}> {
}

interface IDispProps {
  getToekn: () => void;
  getProfileByRestAPI: () => void;
}

class MemberTop extends React.Component<IProps & IDispProps & WithStyles<typeof styles>, {}> {

  componentDidMount() {
    this.props.getToekn();
    this.props.getProfileByRestAPI();
  }

  // static async getInitialProps(options: any) {
  //   return options.store.dispatch(ProfileActions.initProfile({ displayName: options.req.user.displayName }));
  // }

  public render() {
    const { classes, match } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Administrator
          </Typography>
            <Button className={classes.logout} href="/member/logout">Logout</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          {sideMenus}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div><p>URL: {match.url}</p></div>
          <Switch>
            <Route exact path={`/member/profile`} component={Profile} />
            <Route exact path={`/member/form`} component={FormSample} />
            <Route exact path={`/member/`} component={PageSample} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (store: IStore) => {
  return {
  };
};

const mapDispatchToProps = (dispatch): IDispProps => {
  return {
    getToekn: (): void => {
      dispatch(AuthActions.getToken());
    },
    getProfileByRestAPI: (): void => {
      dispatch(ProfileActions.getProfile());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MemberTop));
