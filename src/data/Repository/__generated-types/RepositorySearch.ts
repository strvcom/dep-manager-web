/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RepositorySearch
// ====================================================

export interface RepositorySearch_repository {
  __typename: 'Repository'
  /**
   * The HTTP URL for this repository
   */
  url: any
  /**
   * The name of the repository.
   */
  name: string
}

export interface RepositorySearch {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  repository: RepositorySearch_repository | null
}

export interface RepositorySearchVariables {
  name: string
}
