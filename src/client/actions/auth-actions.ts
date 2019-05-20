import { createTypeAsyncAction } from 'type-redux';
import config from 'react-global-configuration';
import { MemberApiClient } from './clients/api/member-api-client';

export const getToken = createTypeAsyncAction('GET_TOKEN', async () => {
  const url = config.get('protocol') + '://' + config.get('host');
  const client = new MemberApiClient(url);
  return await client.getToken();
});
