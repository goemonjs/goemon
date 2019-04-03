import * as React from 'react';

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
    const { classes } = this.props;

    return (
      <>
        <Typography noWrap>{'Page Sample'}</Typography>
      </>
    );
  }
}

export default withStyles(styles)(PageSample);
