import GApiClient from './gapi-client';

import { helloQuery, HELLO_RESULT_TYPE } from './query/hello';

export class GuestGApiClient extends GApiClient {
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
      endPoint: '/gapi/guest',
      credentials: credentials,
      token: token
    });
  }

  public async hello() {
    return this.doQuery<HELLO_RESULT_TYPE, void>(this.endPoint, helloQuery);
  }
}
