import * as React from 'react';
import { connect } from 'react-redux';

import Todo from '../models/todo';
import * as TodoActions from '../actions/todo-actions';
import TodoListService from '../services/todo-list-service';
import TodoForm from './components/todo/todo-form';
import TodoList from './components/todo/todo-list';
import { IStore } from '../stores/configure-store';

interface IProps {
  todos: Todo[];
  message: string;
  isFetching: boolean;
}

interface IDispProps {
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  loadTodos: (filter, isFetching) => void;
}

class TodoListView extends React.Component<IProps & IDispProps, any> {

  render() {
    let { todos, message, addTodo, toggleTodo, loadTodos, isFetching } = this.props;
    return (
      <div>
        <hr />
        <TodoList todos={todos} message={message} toggleTodo={toggleTodo}/>
        <TodoForm addTodo={addTodo} />
        <hr />
        <p><button onClick={() => loadTodos('', isFetching)} >{ isFetching ? <span>Feching...</span> : <span>Fetch</span> }
        </button> from <a href="/api/todos">/api/todo</a>
        </p>
      </div>
    );
  }

  // It is called only client rendering
  componentDidMount() {
    let { loadTodos, isFetching } = this.props;
    loadTodos('', isFetching);
  }

}

const mapStateToProps = (store: IStore) => {
  return {
    todos: store.todoState.todos,
    message: store.todoState.message,
    isFetching: TodoActions.loadTodos.isPending(store)
  };
};

const mapDispatchToProps = (dispatch): IDispProps => {
  return {
    addTodo: (text: string): void => dispatch(TodoActions.addTodo({ text: text })),
    toggleTodo: (id: number): void => dispatch(TodoActions.toggleTodo(id)),
    loadTodos: (filter, isFetching): void => {
      if ( !isFetching ) {
        let protocol = (('https:' == document.location.protocol) ? 'https://' : 'http://');
        let url = protocol + location.host + '/api/todos';
        dispatch(TodoActions.loadTodos(url));
      }
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListView);
