import * as Redux from 'redux';
import { handleActions, Action } from 'redux-actions';
import assign = require('object-assign');

import { LOAD_PROFILE, UPDATE_FETCH_STATUS } from '../actions/profile-actions';

export type IStateProfile = {
  profile?: any,
  isFetching?: boolean
};

const initialState:IStateProfile = {
  profile: {
    userid : '',
    username : ''
  },
  isFetching: false
};

const reducers: { [key: string]: (state, action:Action<any>) => IStateProfile } = {

  [LOAD_PROFILE]: (state:IStateProfile, action) => {
    if ( action.error ) {
      return {
        message:action.payload.message,
        isFetching:false
      };
    }
    return {
      profile:action.payload,
      isFetching:false
    };
  },

  [UPDATE_FETCH_STATUS]: (state:IStateProfile, action:Action<boolean>) => ({
    isFetching : action.payload
  }),
};

export function profileReducer(state:IStateProfile = initialState, action:Action<any>):IStateProfile {
  if ( reducers[action.type] != null ) {
    return assign({}, state, reducers[action.type](state, action));
  }
  return state;
}
