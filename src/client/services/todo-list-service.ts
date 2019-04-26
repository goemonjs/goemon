import fetch from 'isomorphic-fetch';

export default class TodoListService {

  public static getTodos(url) {
    return new Promise<string>((resolve, reject) => {
      console.log(url);
      fetch(url)
      .then(apiResult => apiResult.json())
      .then(json => resolve(json))    // Success
      .catch(error => reject(error)); // Fail
    });
  }
}
