/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GithubRepository
// ====================================================

export interface GithubRepository_package_Commit {
  __typename: 'Commit' | 'Tree' | 'Tag'
}

export interface GithubRepository_package_Blob {
  __typename: 'Blob'
  id: string
  /**
   * UTF8 text data or null if the Blob is binary
   */
  text: string | null
}

export type GithubRepository_package =
  | GithubRepository_package_Commit
  | GithubRepository_package_Blob

export interface GithubRepository {
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
  package: GithubRepository_package | null
}
