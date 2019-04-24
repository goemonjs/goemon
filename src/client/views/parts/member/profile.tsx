import * as React from 'react';
import { connect } from 'react-redux';
import * as ProfileActions from '../../../actions/profile-actions';
import { IStore } from '../../../stores/member-store';

interface IProps {
  profile: any;
  isFetching: boolean;
}

interface IDispProps {
  loadProfile: (url: string) => void;
}

class Profile extends React.Component<IProps & IDispProps, {}> {

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
        <button type="button" className="btn btn-primary btn-sm" onClick={() => loadProfile(this.url)} disabled={isFetching}>Fetch</button>
        { isFetching ? <span> Feching...</span> : <span> Done</span> }
        <p>Fetch from <a href="/api/me">/api/me</a></p>
      </div>
    );
  }

  // It is called only client rendering
  componentDidMount() {
    let { isFetching, loadProfile } = this.props;
    loadProfile(this.url);
  }
}

const mapStateToProps = (store: IStore, ownProps) => {
  return {
    profile: store.memberState.profile,
    isFetching: ProfileActions.getProfile.isPending(store)
  };
};

const mapDispatchToProps = (dispatch): IDispProps => {
  return {
    loadProfile: (url): void => {
      dispatch(ProfileActions.updateFetchStatus(true));
      dispatch(ProfileActions.getProfile(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
