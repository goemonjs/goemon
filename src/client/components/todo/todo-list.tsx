import * as React from 'react';

import Todo from '../../models/todo';

interface IProps extends React.Props<{}> {
  todos: Todo[];
  message: string;
  toggleTodo: (id: number) => void;
}

export default class TodoListComposer extends React.Component<IProps, any> {
  render() {
    let { todos, message, toggleTodo} = this.props;
    return (
      <div>
        <h2>{message}</h2>
        <ul>
          {todos.map(todo => {
            return (
              <li key={todo.id} onClick={() => toggleTodo(todo.id)}>
                <span style={ todo.completed ? {textDecoration: 'line-through'} : {} }>{todo.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
