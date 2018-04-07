import * as fetch from 'isomorphic-fetch';

export default class TodoListService {

  public static url:string;
  public static getTodos() {
    return new Promise((resolve, reject) => {
      console.log(TodoListService.url);
      fetch(TodoListService.url)
      .then(apiResult => apiResult.json())
      .then(json => resolve(json))    // Success
      .catch(error => reject(error)); // Fail
    });
  }
}
