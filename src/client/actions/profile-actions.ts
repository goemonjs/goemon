import { createAction } from 'redux-actions';
import ProfileController from '../controllers/profile-controller';

export const LOAD_PROFILE = 'LOAD_PROFILE';
export const UPDATE_FETCH_STATUS = 'UPDATE_FETCH_STATUS';

export const updateFetchStatus = createAction<boolean>(UPDATE_FETCH_STATUS);
export const loadProfile = createAction(LOAD_PROFILE, ProfileController.getProfile);
