import * as React from 'react';
import { connect } from 'react-redux';

import * as ProfileActions from '../actions/profile-actions';
import { IStore } from '../stores/configure-store';
import ProfileService from '../services/profile-service';

interface IProps {
  profile: any;
  isFetching: boolean;
}

interface IDispProps {
  loadProfile:(isFetching) => void;
}

class TodoListView extends React.Component<IProps & IDispProps, any> {

  render() {
    var { profile, isFetching, loadProfile } = this.props;
    return (
      <div className="container">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => loadProfile(isFetching)} >Fetch</button>
        { isFetching ? <span> Feching...</span> : <span> Done</span> }
        <p>Fetch from <a href="/api/me">/api/me</a></p>
        <hr />
        <h2>UserId : { profile.userid }</h2>
        <h2>Username : { profile.username }</h2>
      </div>
    );
  }

  // It is called only client rendering
  componentDidMount() {
    //var { loadProfile, isFetching } = this.props;
    //loadProfile(isFetching);
  }

  // It is called both server rendering and client rendering
  componentWillMount() {
    if ( typeof(document) != 'undefined' ) {
      let protocol = (('https:' == document.location.protocol) ? 'https://' : 'http://');
      ProfileService.url = protocol + location.host + '/api/me';
    }
  }
}

export default connect(
  (store:IStore) => ({
    profile: store.profileState.profile,
    isFetching: store.profileState.isFetching
  }),
  dispatch => ({
    loadProfile: (isFetching): void => {
      if ( !isFetching ) {
        dispatch(ProfileActions.updateFetchStatus(true));
        dispatch(ProfileActions.loadProfile());
      }
    }
  })
)(TodoListView);
