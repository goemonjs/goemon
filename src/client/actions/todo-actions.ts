import { createAction } from 'redux-actions';
import Todo from '../models/todo';
import TodoListService from '../services/todo-list-service';

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODOS = 'TOGGLE_TODOS';
export const UPDATE_FETCH_STATUS = 'UPDATE_FETCH_STATUS';
export const LOAD_TODOS = 'GET_TODOS';

export interface IPayloadAddTodo {
  text:string;
  todo:Todo;
}

export const addTodo = createAction<string, IPayloadAddTodo>(ADD_TODO, (text:string) => {
  return {
    text: text,
    todo: new Todo(text, false)
  };
});
export const toggleTodo = createAction<number>(TOGGLE_TODOS);
export const updateFetchStatus = createAction<boolean>(UPDATE_FETCH_STATUS);
export const loadTodos = createAction(LOAD_TODOS, TodoListService.getTodos);

// Sample

// export function addTodo(text:string) {
//     return {
//         type: ADD_TODO,
//         payload:text
//     };
// }

// export function updateFetchStatus(value:boolean) {
//     return {
//         type: UPDATE_FETCH_STATUS,
//         payload:value
//     };
// }

// export function receiveTodo(todos) {
//     return {
//         type: RECEIVE_TODOS,
//         payload:todos
//     };
// }
