/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RepositoriesSearch
// ====================================================

export interface RepositoriesSearch_organization_repositories_nodes_object_Commit {
  __typename: 'Commit' | 'Tree' | 'Tag'
}

export interface RepositoriesSearch_organization_repositories_nodes_object_Blob_package_dependencies {
  __typename: 'NodePackageDependency'
  id: string
  name: string
  version: string
}

export interface RepositoriesSearch_organization_repositories_nodes_object_Blob_package {
  __typename: 'NodePackage'
  id: string
  name: string | null
  version: string | null
  dependencies: RepositoriesSearch_organization_repositories_nodes_object_Blob_package_dependencies[]
}

export interface RepositoriesSearch_organization_repositories_nodes_object_Blob {
  __typename: 'Blob'
  id: string
  /**
   * UTF8 text data or null if the Blob is binary
   */
  text: string | null
  package: RepositoriesSearch_organization_repositories_nodes_object_Blob_package | null
}

export type RepositoriesSearch_organization_repositories_nodes_object =
  | RepositoriesSearch_organization_repositories_nodes_object_Commit
  | RepositoriesSearch_organization_repositories_nodes_object_Blob

export interface RepositoriesSearch_organization_repositories_nodes {
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
  object: RepositoriesSearch_organization_repositories_nodes_object | null
}

export interface RepositoriesSearch_organization_repositories {
  __typename: 'RepositoryConnection'
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number
  /**
   * A list of nodes.
   */
  nodes: (RepositoriesSearch_organization_repositories_nodes | null)[] | null
}

export interface RepositoriesSearch_organization {
  __typename: 'Organization'
  id: string
  /**
   * A list of repositories that the user owns.
   */
  repositories: RepositoriesSearch_organization_repositories
}

export interface RepositoriesSearch {
  /**
   * Lookup a organization by login.
   */
  organization: RepositoriesSearch_organization | null
}

export interface RepositoriesSearchVariables {
  after?: string | null
  before?: string | null
  first?: number | null
  last?: number | null
}
