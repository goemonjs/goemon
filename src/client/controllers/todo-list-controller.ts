import * as fetch from 'isomorphic-fetch';

export default class TodoListController {

  public static url:string;
  public static getTodos() {
    return new Promise((resolve, reject) => {
      console.log(TodoListController.url);
      fetch(TodoListController.url)
      .then(apiResult => apiResult.json())
      .then(json => resolve(json))    // Success
      .catch(error => reject(error)); // Fail
    });
  }
}
