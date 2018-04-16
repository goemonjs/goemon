import * as Redux from 'redux';
import { handleActions, Action } from 'redux-actions';
import assign = require('object-assign');
import * as Actions from '../actions/profile-actions';

export type IState = {
  profile?: any,
  isFetching?: boolean
};

export const initialState: IState = {
  profile: {
    userid : '',
    username : ''
  },
  isFetching: false
};

const reducers: { [key: string]: (state, action: Action<any>) => IState } = {

  [Actions.LOAD_PROFILE]: (state: IState, action) => {
    if ( action.error ) {
      return {
        message: action.payload.message,
        isFetching: false
      };
    }
    return {
      profile: action.payload,
      isFetching: false
    };
  },

  [Actions.UPDATE_FETCH_STATUS]: (state: IState, action: Action<boolean>) => ({
    isFetching : action.payload
  }),
};

export function reducer(state: IState = initialState, action: Action<any>): IState {
  if ( reducers[action.type] != undefined ) {
    return assign({}, state, reducers[action.type](state, action));
  }
  return state;
}
