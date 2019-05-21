import React from 'react';
import { connect } from 'react-redux';
import * as ProfileActions from '../../../actions/profile-actions';
import { IStore } from '../../../stores/member-store';
import { styles } from '../../../themes/material-ui-lightblue';
import { withStyles } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core';

interface IProps {
  email?: string;
  displayName?: string;
  profile: {
    email?: string;
    displayName?: string;
    firstName?: string;
    lastName?: string;
  };
  isAPIFetching: boolean;
  isGAPIFetching: boolean;
  token?: string;
}

interface IDispProps {
  getProfileByRestAPI: () => void;
  getProfileByGraphqlAPI: (token) => void;
}

interface IState {
}

class Profile extends React.Component<IProps & IDispProps & WithStyles<typeof styles>, IState> {

  render() {
    let { token, profile, isAPIFetching, isGAPIFetching, getProfileByRestAPI, getProfileByGraphqlAPI } = this.props;

    if (!profile.displayName && token) {
      getProfileByGraphqlAPI(token);
    }

    return (
      <div>
        <h2>Rest API Sample</h2>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => getProfileByRestAPI()} disabled={isAPIFetching}>Fetch</button>
        {isAPIFetching ? <span> Feching...</span> : <span> Done</span>}
        <p>Fetch from <a href="/api/me">/api/me</a></p>
        <h3>eEail : {this.props.email}</h3>
        <h3>Name : {this.props.displayName}</h3>
        <hr></hr>
        <h2>Graphql API Sample</h2>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => getProfileByGraphqlAPI(token)} disabled={isGAPIFetching}>Fetch</button>
        {isGAPIFetching ? <span> Feching...</span> : <span> Done</span>}
        <p>Fetch from <a href="/gapi/member">/gapi/member</a></p>
        {token == undefined ? <span>Getting token..</span> : this.profileComponent()}
        <hr></hr>
        <h2>Authentication token:</h2>
        <p>{this.props.token}</p>
      </div>
    );
  }

  profileComponent = () => {
    let { profile } = this.props;
    return (
      <>
        <h3>EMail : {profile.email} </h3>
        <h3>DisplayName : {profile.displayName} </h3>
        <h3>FirstName : {profile.firstName} </h3>
        <h3>LastName : {profile.lastName} </h3>
      </>
    );
  }

  // It is called only client rendering
  componentDidMount() {
    let { getProfileByRestAPI, getProfileByGraphqlAPI, token } = this.props;
    getProfileByRestAPI();
    if (token != undefined) {
      getProfileByGraphqlAPI(token);
    }
  }
}

const mapStateToProps = (store: IStore, ownProps) => {
  return {
    token: store.memberState.token,
    email: store.memberState.email,
    displayName: store.memberState.displayName,
    profile: store.memberState.profile,
    isAPIFetching: ProfileActions.getProfile.isPending(store),
    isGAPIFetching: ProfileActions.getProfileByGAPI.isPending(store)
  };
};

const mapDispatchToProps = (dispatch): IDispProps => {
  return {
    getProfileByRestAPI: (): void => {
      dispatch(ProfileActions.getProfile());
    },
    getProfileByGraphqlAPI: (token): void => {
      dispatch(ProfileActions.getProfileByGAPI({ token: token }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
