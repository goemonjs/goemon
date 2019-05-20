import { createTypeReducer } from 'type-redux';
import * as ProfileActions from '../actions/profile-actions';
import * as AuthActions from '../actions/auth-actions';

// Redux Action Reducer Samples
export type IState = {
  token?: string;
  message: string;
  snackBarState: {
    type: 'success' | 'warning' | 'error' | 'info';
    open: boolean;
  };
  profile: {
    userid: string,
    username: string,
    displayName?: string,
    firstName?: string,
    lastName?: string
  }
};

export const initialState: IState = {
  token: undefined,
  message: '',
  snackBarState: {
    type: 'info',
    open: false
  },
  profile: {
    userid: '-',
    username: '-',
    displayName: '-',
    firstName: '-',
    lastName: '-'
  }
};

export const getProfileReducer = ProfileActions.getProfile.reducer<IState>((state, action) => {
  if (action.error) {
    return {
      userid: '',
      username: '',
      message: action.payload!.message && <string>action.meta,
      snackBarState: {
        type: 'error',
        open: true
      }
    };
  }
  return {
    profile: {
      userid: action.payload.id,
      username: action.payload.email
    },
    message: ''
  };
});

export const getProfileByGAPIReducer = ProfileActions.getProfileByGAPI.reducer<IState>((state, action) => {
  if (action.error) {
    return {
      userid: '',
      username: '',
      message: action.payload!.message,
      snackBarState: {
        type: 'error',
        open: true
      }
    };
  }
  return {
    profile: {
      userid: state.profile.userid,
      username: state.profile.username,
      displayName: action.payload.getProfile.displayName,
      firstName: action.payload.getProfile.firstName,
      lastName: action.payload.getProfile.lastName,
    },
    message: ''
  };
});

export const getTokenReducer = AuthActions.getToken.reducer<IState>((state, action) => {
  if (action.error) {
    return {
      token: undefined,
      message: action.payload!.message && <string>action.meta,
      snackBarState: {
        type: 'error',
        open: true
      }
    };
  }
  return {
    token: action.payload.token
  };
});

export const reducer = createTypeReducer(
  initialState,
  getTokenReducer,
  getProfileReducer,
  getProfileByGAPIReducer
);
