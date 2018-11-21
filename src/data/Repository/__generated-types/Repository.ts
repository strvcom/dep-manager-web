/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Repository
// ====================================================

export interface Repository_object_Commit {
  __typename: 'Commit' | 'Tree' | 'Tag'
}

export interface Repository_object_Blob {
  __typename: 'Blob'
  id: string
  /**
   * UTF8 text data or null if the Blob is binary
   */
  text: string | null
  name: string | null
}

export type Repository_object =
  | Repository_object_Commit
  | Repository_object_Blob

export interface Repository {
  __typename: 'Repository'
  id: string
  /**
   * The name of the repository.
   */
  name: string
  /**
   * The HTTP URL for this repository
   */
  url: any
  /**
   * Identifies when the repository was last pushed to.
   */
  pushedAt: any | null
  /**
   * Indicates if the repository is unmaintained.
   */
  isArchived: boolean
  /**
   * A Git object in the repository
   */
  object: Repository_object | null
}
