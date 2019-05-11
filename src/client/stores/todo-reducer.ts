import { createTypeReducer } from 'type-redux';
import * as Actions from '../actions/todo-actions';
import { Todo } from '../objects/todo';

// Type Action Reducer Samples
export type IState = {
  message: string,
  todos: Todo[]
};

export const initialState: IState = {
  message: 'Please add items',
  todos: []
};

export const addTodoReducer = Actions.addTodo.reducer<IState>((state, action) => ({
  message: action.payload.text,
  todos: state.todos.concat(action.payload.todo)
}));

export const toggleTodoReducer = Actions.toggleTodo.reducer<IState>((state, action) => {
  let todos: Todo[] = state.todos.concat();
  let id: number = action.payload.id;
  todos.map(todo => {
    if (todo.id == id) {
      todo.completed = !todo.completed;
      return;
    }
  });
  return {
    todos: todos
  };
});

export const loadTodoReducer = Actions.listTodos.reducer<IState>((state, action) => {
  if (action.error) {
    return {
      message: action.payload && action.payload.message,
    };
  }
  return {
    todos: action.payload
  };
});

export const reducer = createTypeReducer(
  initialState,
  addTodoReducer,
  loadTodoReducer,
  toggleTodoReducer
);
