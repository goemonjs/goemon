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
}

export interface Task {
  _id: string;

  caption: string;

  isChecked: boolean;

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
