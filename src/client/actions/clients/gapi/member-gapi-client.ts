import GApiClient from './gapi-client';

import { getProfileQuery, GETPROFILE_RESULT_TYPE } from './member/query/profile';

export class MemberGApiClient extends GApiClient {
  constructor({
    baseUrl,
    credentials,
    token,
  }: {
    baseUrl: string;
    credentials?: string;
    token?: string;
  }) {
    super({
      baseUrl: baseUrl,
      endPoint: '/gapi/member',
      credentials: credentials,
      token: token
    });
  }

  public async getProfile() {
    return this.doQuery<GETPROFILE_RESULT_TYPE, void>(this.endPoint, getProfileQuery);
  }
}
