import { doGet } from '../../../../base/utilities/network';

export class MemberApiClient {

  constructor(
    private baseUrl: string
  ) {
  }

  public async token() {
    type RESULT_TYPE = {
      token
    };
    return await doGet<RESULT_TYPE>(this.baseUrl + '/token');
  }

  public async getUserProfile() {
    type RESULT_TYPE = {
      email: string,
      displayName: string,
      roles: string[]
    };
    return await doGet<RESULT_TYPE>(this.baseUrl + '/api/me');
  }

  public async getToken() {
    type RESULT_TYPE = {
      token
    };
    return await doGet<RESULT_TYPE>(this.baseUrl + '/api/token');
  }
}
