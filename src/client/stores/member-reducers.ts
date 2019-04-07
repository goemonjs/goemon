import { createTypeReducer } from 'type-redux';
import * as Actions from '../actions/profile-actions';

// Redux Action Reducer Samples
export type IState = {
  message: string;
  snackBarState: {
    type: 'success' | 'warning' | 'error' | 'info';
    open: boolean;
  };
  profile: {
    userid: string,
    username: string
  }
};

export const initialState: IState = {
  message: '',
  snackBarState: {
    type: 'info',
    open: false
  },
  profile: {
    userid : '',
    username : ''
  }
};

export const getProfileReducer = Actions.getProfile.reducer<IState>((state, action) => {
  if ( action.error ) {
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

export const reducer = createTypeReducer(
  initialState,
  getProfileReducer
);
