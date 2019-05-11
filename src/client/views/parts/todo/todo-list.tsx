import React from 'react';
import { connect } from 'react-redux';

import { Todo } from '../../../objects/todo';
import * as TodoActions from '../../../actions/todo-actions';
import TodoForm from '../../components/todo/todo-form';
import TodoList from '../../components/todo/todo-list';
import { IStore } from '../../../stores/member-store';

interface IProps {
  todos: Todo[];
  message: string;
  isFetching: boolean;
}

interface IDispProps {
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  listTodos: () => void;
}

class TodoListView extends React.Component<IProps & IDispProps, any> {

  render() {
    let { todos, message, addTodo, toggleTodo, listTodos, isFetching } = this.props;
    return (
      <div>
        <hr />
        <TodoList todos={todos} message={message} toggleTodo={toggleTodo} />
        <TodoForm addTodo={addTodo} />
        <hr />
        <p><button onClick={() => listTodos()} >{isFetching ? <span>Feching...</span> : <span>Fetch</span>}
        </button> from <a href="/api/todos">/api/todo</a>
        </p>
      </div>
    );
  }

  // It is called only client rendering
  componentDidMount() {
    // let { loadTodos, isFetching } = this.props;
    // loadTodos('', isFetching);
  }

}

const mapStateToProps = (store: IStore) => {
  return {
    todos: store.todoState.todos,
    message: store.todoState.message,
    isFetching: TodoActions.listTodos.isPending(store)
  };
};

const mapDispatchToProps = (dispatch): IDispProps => {
  return {
    addTodo: (text: string): void => dispatch(TodoActions.addTodo({ text: text })),
    toggleTodo: (id: number): void => dispatch(TodoActions.toggleTodo(id)),
    listTodos: (): void => {
      dispatch(TodoActions.listTodos());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListView);
