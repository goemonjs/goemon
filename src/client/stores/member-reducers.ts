import { createTypeReducer } from 'type-redux';
import * as ProfileActions from '../actions/profile-actions';
import * as AuthActions from '../actions/auth-actions';

// Redux Action Reducer Samples
export type IState = {
  token?: string;
  email?: string;
  displayName?: string;
  roles: string[];
  profile: {
    userId?: string,
    email?: string,
    displayName?: string,
    firstName?: string,
    lastName?: string
  },
  message: string;
  snackBarState: {
    type: 'success' | 'warning' | 'error' | 'info';
    open: boolean;
  };
};

export const initialState: IState = {
  displayName: 'A',
  roles: [],
  profile: {
    userId: undefined,
    email: undefined,
    displayName: undefined,
    firstName: undefined,
    lastName: undefined
  },
  message: '',
  snackBarState: {
    type: 'info',
    open: false
  },
};

export const initProfileReducer = ProfileActions.initProfile.reducer<IState>((state, action) => {
  if (action.error) {
    return {};
  }
  return {
    displayName: action.payload.displayName
  };
});

export const getProfileReducer = ProfileActions.getProfile.reducer<IState>((state, action) => {
  if (action.error) {
    return {
      userId: undefined,
      email: undefined,
      message: action.payload!.message && <string>action.meta,
      snackBarState: {
        type: 'error',
        open: true
      }
    };
  }
  return {
    email: action.payload.email,
    // displayName: action.payload.displayName,
    roles: action.payload.roles,
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
      email: action.payload.getProfile.email,
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
  initProfileReducer,
  getTokenReducer,
  getProfileReducer,
  getProfileByGAPIReducer
);
