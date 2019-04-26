import  React from 'react';
import moment from 'moment';
import { Trans } from 'react-i18next';

import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import { styles } from '../../../themes/material-ui-lightblue';

interface IProps  {
}

interface IState  {
}

export class PageSample extends React.Component<IProps & WithStyles<typeof styles>, IState> {

  public render() {
    const count = 1;
    const name = 'bababa';
    const currentDate = new Date();

    return (
      <>
        <Typography noWrap>{'Page Sample'}</Typography>
        {/* <Trans i18nKey="userMessagesUnread" count={count}>
          Not supported lang test. <strong>{{name}}</strong>, you have {{count}} unread message.
        </Trans>
        <Trans i18nKey="currentDate" values={{ date: currentDate}}>
          CurrentDate : {moment(currentDate).format('MM/DD/YYYY')}
        </Trans> */}
      </>
    );
  }
}

export default withStyles(styles)(PageSample);
