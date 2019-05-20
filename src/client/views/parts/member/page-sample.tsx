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
  token?: string;
}

interface IDispProps {
}

interface IState {
}

export class PageSample extends React.Component<IProps & IDispProps & WithStyles<typeof styles>, IState> {

  public render() {
    const count = 1;
    const name = 'bababa';
    const currentDate = new Date();

    return (
      <>
        <Trans i18nKey="userMessagesUnread" count={count}>
          Not supported lang test. <strong>{{ name }}</strong>, you have {{ count }} unread message.
        </Trans>
        <Trans i18nKey="currentDate" values={{ date: currentDate }}>
          CurrentDate : {moment(currentDate).format('MM/DD/YYYY')}
        </Trans>
        <p>Authentication token:</p>
        <p>{this.props.token}</p>
      </>
    );
  }
}

const mapStateToProps = (store: IStore) => {
  return {
    token: store.memberState.token
  };
};

const mapDispatchToProps = (dispatch): IDispProps => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PageSample));
