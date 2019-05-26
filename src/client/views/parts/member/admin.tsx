import React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../../stores/member-store';
import { styles } from '../../../themes/material-ui-lightblue';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';

interface IProps {
}

interface IDispProps {
}

interface IState {
}

class Admin extends React.Component<IProps & IDispProps & WithStyles<typeof styles>, IState> {

  render() {
    return (
      <div>
        <p>Administrator login <a href="/admin/login">/admin/login</a></p>
      </div>
    );
  }

}

const mapStateToProps = (store: IStore, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch): IDispProps => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Admin));
