import * as fetch from 'isomorphic-fetch';

export default class ProfileService {

  public static url: string;
  public static getProfile() {
    return new Promise((resolve, reject) => {
      console.log(ProfileService.url);
      fetch(ProfileService.url, {
        credentials: 'include', //pass cookies, for authentication
        //method: 'post',
        // headers: {
        // 'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        // 'Content-Type': 'charset=utf-8'
        // }
      })
      .then(apiResult => apiResult.json())
      .then(json => resolve(json))    // Success
      .catch(error => reject(error)); // Fail
    });
  }
}
