export type Maybe<T> = T | null;

export interface ListTasksInput {
  skip?: Maybe<number>;

  limit?: Maybe<number>;

  orderBy?: Maybe<ListTasksOrderByInput>;
}

export enum ListTasksOrderByInput {
  CreatedAtAsc = "createdAt_ASC",
  CreatedAtDesc = "createdAt_DESC"
}

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
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

  getProfile?: Maybe<Profile>;
}

export interface Task {
  _id: string;

  caption: string;

  isChecked: boolean;

  createdAt?: Maybe<string>;

  updatedAt?: Maybe<string>;
}

export interface Profile {
  email: string;

  roles?: Maybe<(Maybe<string>)[]>;

  displayName: string;

  isEmailVeried?: Maybe<boolean>;

  image: string;

  firstName: string;

  middleName?: Maybe<string>;

  lastName: string;

  birthDay?: Maybe<string>;

  createdAt?: Maybe<string>;

  updatedAt?: Maybe<string>;
}

export interface Mutation {
  _?: Maybe<boolean>;

  addTask?: Maybe<Task>;

  updateTask?: Maybe<Task>;

  removeTask?: Maybe<number>;
}

export interface Subscription {
  _?: Maybe<boolean>;
}

export interface User {
  id: string;

  email: string;

  displayName: string;

  roles?: Maybe<(Maybe<string>)[]>;
}

// ====================================================
// Arguments
// ====================================================

export interface ListTasksQueryArgs {
  input?: Maybe<ListTasksInput>;
}
export interface AddTaskMutationArgs {
  caption: string;

  isChecked: boolean;
}
export interface UpdateTaskMutationArgs {
  id: string;

  caption: string;

  isChecked: boolean;
}
export interface RemoveTaskMutationArgs {
  id: string;
}
