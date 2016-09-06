import * as React from 'react';
import { connect } from 'react-redux';

import Todo from '../models/todo';
import Message from '../components/message';
import { IStore } from '../stores/configure-store';

interface IProps {
  todos: Todo[];
  message:string;
}

@connect(
  (store:IStore) => ({
    todos: store.todoState.todos,
    message: store.todoState.message,
  }),
  dispatch => ({
  })
)
export default class TodoListView extends React.Component<IProps, void> {

  render() {
    var { todos, message } = this.props;
    var count = todos.length.toString();
    return (
      <div>
        <Message message={count}/>
      </div>
    );
  }
}
