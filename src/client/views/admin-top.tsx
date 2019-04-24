import * as React from 'react';
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

import FormSample from './parts/member/form-sample';

// Styles
import { styles } from '../themes/material-ui-red';

import { sideMenus } from './parts/admin/side-menu';

interface IProps extends React.Props<{}>, RouteComponentProps<{}> {
}

class AdminTop extends React.Component<IProps & WithStyles<typeof styles>, {}> {

    public render() {
      const { classes, match } = this.props;

      return (
        <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Administrator
          </Typography>
          <Button className={classes.logout} href="/admin/logout">Logout</Button>
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
          <Route exact path={`${match.url}`} component={FormSample} />
        </Switch>
      </main>
    </div>
        );
    }
  }

export default withStyles(styles)(AdminTop);
