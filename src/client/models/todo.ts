export default class Todo {

  constructor(
    public text: string,
    public completed: boolean = false,
    public id?: number
  ) {
    if ( id == undefined ) {
      this.id = Date.now();
    }
  }
}
