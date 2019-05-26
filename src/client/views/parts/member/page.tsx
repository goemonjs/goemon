import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Trans } from 'react-i18next';

import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';

import { styles } from '../../../themes/material-ui-lightblue';
import { IStore } from '../../../stores/member-store';

import * as ProfileActions from '../../../actions/profile-actions';

interface IProps {
  email?: string;
  displayName?: string;
  roles?: string[];
}

interface IDispProps {
  getProfileByRestAPI: () => void;
}

interface IState {
}

export class PageSample extends React.Component<IProps & IDispProps & WithStyles<typeof styles>, IState> {

  componentDidMount() {
    let { getProfileByRestAPI } = this.props;
    getProfileByRestAPI();
  }

  static async getInitialProps(options: any) {
    return options.store.dispatch(ProfileActions.initProfile({ displayName: 'hoGEGEGE' }));
  }

  public render() {
    const { displayName } = this.props;
    const count = 1;
    const currentDate = new Date();

    return (
      <>
        <p>
          <Trans i18nKey="userMessagesUnread" count={count}>
            Not supported lang test. <strong>{{ displayName }}</strong>, you have {{ count }} unread message.
        </Trans>
        </p>
        <p>
          <Trans i18nKey="currentDate" values={{ date: currentDate }}>
            CurrentDate : {moment(currentDate).format('MM/DD/YYYY')}
          </Trans>
        </p>
      </>
    );
  }
}

const mapStateToProps = (store: IStore) => {
  return {
    email: store.memberState.email,
    displayName: store.memberState.displayName,
    roles: store.memberState.roles
  };
};

const mapDispatchToProps = (dispatch): IDispProps => {
  return {
    getProfileByRestAPI: (): void => {
      dispatch(ProfileActions.getProfile());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PageSample));
