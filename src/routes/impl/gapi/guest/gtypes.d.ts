export type Maybe<T> = T | null;

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

  hello?: Maybe<string>;
}

export interface Mutation {
  _?: Maybe<boolean>;
}

export interface Subscription {
  _?: Maybe<boolean>;
}

// ====================================================
// Arguments
// ====================================================
