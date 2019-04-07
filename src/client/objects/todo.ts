export class Todo {

  constructor(
    public text: string,
    public completed: boolean = false,
    public id: number = Date.now()
  ) {
  }
}
