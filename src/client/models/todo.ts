export default class Todo {

  constructor(
    public text: string,
    public completed: boolean = false,
    public id?: number
  ) {
    if ( id == null ) {
      this.id = Date.now();
    }
  }
}
