import * as React from 'react';
import { connect } from 'react-redux';

import Todo from '../models/todo';
import * as TodoActions from '../actions/todo-actions';
import TodoListController from '../controllers/todo-list-controller';
import TodoForm from '../components/todo/todo-form';
import TodoList from '../components/todo/todo-list';
import { IStore } from '../stores/configure-store';

interface IProps {
  todos: Todo[];
  message:string;
  isFetching:boolean;
}

interface IDispProps {
  addTodo:(text:string) => void;
  toggleTodo:(id:number) => void;
  loadTodos:(filter, isFetching) => void;
}

@connect(
  (store:IStore) => ({
    todos: store.todoState.todos,
    message: store.todoState.message,
    isFetching: store.todoState.isFetching
  }),
  dispatch => ({
    addTodo: (text): void => dispatch(TodoActions.addTodo(text)),
    toggleTodo: (id): void => dispatch(TodoActions.toggleTodo(id)),
    loadTodos: (filter, isFetching): void => {
      if ( !isFetching ) {
        dispatch(TodoActions.updateFetchStatus(true));
        dispatch(TodoActions.loadTodos());
      }
    }
  })
)
export default class TodoListView extends React.Component<IProps & IDispProps, void> {

  render() {
    var { todos, message, addTodo, toggleTodo, loadTodos, isFetching } = this.props;
    return (
      <div>
        <hr />
        <TodoList todos={todos} message={message} toggleTodo={toggleTodo}/>
        <TodoForm addTodo={addTodo} />
        <hr />
        <p><button onClick={() => loadTodos('',isFetching)} >{ isFetching ? <span>Feching...</span> : <span>Fetch</span> }
        </button> from <a href="/api/todos">/api/todo</a>
        </p>
      </div>
    );
  }

  // It is called only client rendering
  componentDidMount() {
    var { loadTodos, isFetching } = this.props;
    // loadTodos('', isFetching);
  }

  // It is called both server rendering and client rendering
  componentWillMount() {
    if ( typeof(document) != 'undefined' ) {
      let protocol = (('https:' == document.location.protocol) ? 'https://' : 'http://');
      TodoListController.url = protocol + location.host + '/api/todos';
    }
  }
}

// Sample for redux normal way to connect instead of @connect directive

// function mapStateToProps(store:IStore) {
//   return {
//     todos: store.todoState.todos,
//     message: store.todoState.message,
//     isFetching: store.todoState.isFetching
//   }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     addTodo: (text): void => dispatch(addTodo(text)),
//     loadTodos: (filter, isFetching): void => {
//         if ( !isFetching ) {
//             dispatch(updateFetchStatus(true));
//             dispatch(loadTodos());
//         }
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TodoListView;)
