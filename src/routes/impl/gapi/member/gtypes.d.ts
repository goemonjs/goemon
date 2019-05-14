export type Maybe<T> = T | null;

export interface UpdateTaskInput {
  id: string;

  caption: string;

  isChecked: boolean;
}

export interface RemoveTaskInput {
  id: string;
}

export interface AddTaskInput {
  caption: string;

  isChecked: boolean;
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

/** The `Upload` scalar type represents a file upload. */
export type Upload = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  _?: Maybe<boolean>;

  listTasks?: Maybe<(Maybe<Task>)[]>;
}

export interface Task {
  _id: string;

  caption: string;

  isChecked: boolean;
}

export interface Mutation {
  _?: Maybe<boolean>;

  addTask?: Maybe<Task>;

  updateTask?: Maybe<Task>;

  removeTask?: Maybe<Task>;
}

export interface Subscription {
  _?: Maybe<boolean>;
}

// ====================================================
// Arguments
// ====================================================

export interface AddTaskMutationArgs {
  caption?: Maybe<string>;
}
export interface UpdateTaskMutationArgs {
  input: UpdateTaskInput;
}
export interface RemoveTaskMutationArgs {
  input: RemoveTaskInput;
}
