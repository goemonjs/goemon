
import { createTypeAction, createTypeAsyncAction } from 'type-redux';
import config from 'react-global-configuration';

import { MemberApiClient } from './clients/api/member-api-client';
import { MemberGApiClient } from './clients/gapi/member-gapi-client';

// Redux Action Reducer Samples
export const LOAD_PROFILE = 'LOAD_PROFILE';

export const getProfile = createTypeAsyncAction('GET_PROFILE', async () => {
  const url = config.get('protocol') + '://' + config.get('host');
  const client = new MemberApiClient(url);
  return await client.getUserProfile();
});

export const getProfileByGAPI = createTypeAsyncAction('GET_PROFILE_BY_GAPI', async (args: { token: string }) => {
  const url = config.get('protocol') + '://' + config.get('host');
  const client = new MemberGApiClient({
    baseUrl: url,
    token: args.token
  });
  return await client.getProfile();
});

export const initProfile = createTypeAsyncAction('INIT_PROFILE', async (args: { displayName }) => {
  return {
    displayName: args.displayName
  };
});
