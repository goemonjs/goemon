import * as React from 'react';
import { connect } from 'react-redux';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import * as ProfileActions from '../actions/profile-actions';
import { IStore } from '../stores/member-store';
import ProfileService from '../services/profile-service';

interface IProps {
  profile: any;
  isFetching: boolean;
}

interface IDispProps {
  loadProfile: (url: string, isFetching: boolean) => void;
}

class ProfileView extends React.Component<IProps & IDispProps, {}> {

  private url: string = '';

  render() {
    let { profile, isFetching, loadProfile } = this.props;

    if ( typeof(document) !== 'undefined' ) {
      let protocol = (('https:' == document.location.protocol) ? 'https://' : 'http://');
      this.url = protocol + location.host + '/api/me';
    }

    return (
      <div>
        <h2>UserId : { profile.userid }</h2>
        <h2>Username : { profile.username }</h2>
        <button type="button" className="btn btn-primary btn-sm" onClick={() => loadProfile(this.url, isFetching)} >Fetch</button>
        { isFetching ? <span> Feching...</span> : <span> Done</span> }
        <p>Fetch from <a href="/api/me">/api/me</a></p>
      </div>
    );
  }

  // This is not work, because the server does not have the credential cookie to asscess api/me
  // static async getInitialProps(store, protocol: string, host: string) {
  //   const url = protocol + '://' + host + '/api/me';
  //   return store.dispatch(ProfileActions.loadProfile(url));
  // }

  // It is called only client rendering
  componentDidMount() {
    let { isFetching, loadProfile } = this.props;
    loadProfile(this.url, isFetching);
  }
}

const mapStateToProps = (store: IStore, ownProps) => {
  return {
    profile: store.profileState.profile,
    isFetching: ProfileActions.loadProfile.isPending(store)
  };
};

const mapDispatchToProps = (dispatch): IDispProps => {
  return {
    loadProfile: (url, isFetching): void => {
      if ( !isFetching ) {
        dispatch(ProfileActions.updateFetchStatus(true));
        dispatch(ProfileActions.loadProfile(url));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
