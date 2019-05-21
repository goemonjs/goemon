import React from 'react';
import { connect } from 'react-redux';
import * as ProfileActions from '../../../actions/profile-actions';
import { IStore } from '../../../stores/member-store';
import { styles } from '../../../themes/material-ui-lightblue';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';

interface IProps {
  profile: {
    userid: string,
    username: string,
    displayName?: string,
    firstName?: string,
    lastName?: string
  };
  isFetching: boolean;
  token?: string;
}

interface IDispProps {
  loadProfile: (url: string) => void;
  getProfileByGAPI: (token) => void;
}

interface IState {
}

class Profile extends React.Component<IProps & IDispProps & WithStyles<typeof styles>, IState> {

  private url: string = '';

  render() {
    let { token, profile, isFetching, loadProfile, getProfileByGAPI } = this.props;

    if (!token) {
      return (<div>Authenticating...</div>);
    }

    if (!profile.displayName) {
      getProfileByGAPI(this.props.token);
    }

    if (typeof (document) !== 'undefined') {
      let protocol = (('https:' == document.location.protocol) ? 'https://' : 'http://');
      this.url = protocol + location.host + '/api/me';
    }

    return (
      <div>
        <h2>UserId : {profile.userid}</h2>
        <h2>Username : {profile.username}</h2>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => loadProfile(this.url)} disabled={isFetching}>Fetch</button>
        {isFetching ? <span> Feching...</span> : <span> Done</span>}
        <p>Fetch from <a href="/api/me">/api/me</a></p>
        <hr></hr>
        <h2>DisplayName : {profile.displayName} </h2>
        <h2>firstName : {profile.firstName} </h2>
        <h2>lastName : {profile.lastName} </h2>
      </div>
    );
  }

  // It is called only client rendering
  componentDidMount() {
    let { getProfileByGAPI, loadProfile } = this.props;
    loadProfile(this.url);
  }
}

const mapStateToProps = (store: IStore, ownProps) => {
  return {
    token: store.memberState.token,
    profile: store.memberState.profile,
    isFetching: ProfileActions.getProfile.isPending(store) || ProfileActions.getProfileByGAPI.isPending(store)
  };
};

const mapDispatchToProps = (dispatch): IDispProps => {
  return {
    loadProfile: (url): void => {
      dispatch(ProfileActions.getProfile(url));
    },
    getProfileByGAPI: (token): void => {
      dispatch(ProfileActions.getProfileByGAPI({ token: token }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
