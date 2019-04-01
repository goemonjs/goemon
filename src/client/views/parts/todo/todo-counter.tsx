import * as React from 'react';
import { connect } from 'react-redux';

import Todo from '../../../models/todo';
import Message from '../../components/message';
import { IStore } from '../../../stores/member-store';

interface IProps {
  todos: Todo[];
  message: string;
}

class TodoListView extends React.Component<IProps, any> {

  render() {
    let { todos, message } = this.props;
    let count = todos.length.toString();
    return (
      <div>
        <hr />
        <h2>Todo count : <Message message={count} style={{color: 'blue'}} /></h2>
      </div>
    );
  }
}

export default connect(
  (store: IStore) => ({
    todos: store.todoState.todos,
    message: store.todoState.message,
  }),
  dispatch => ({
  })
)(TodoListView);
