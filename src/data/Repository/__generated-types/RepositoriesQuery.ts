/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RepositoriesQuery
// ====================================================

export interface RepositoriesQuery_organization_repositories_nodes_object_Commit {
  __typename: 'Commit' | 'Tree' | 'Tag'
}

export interface RepositoriesQuery_organization_repositories_nodes_object_Blob_package_dependencies {
  __typename: 'NodePackageDependency'
  id: string
  name: string
  version: string
}

export interface RepositoriesQuery_organization_repositories_nodes_object_Blob_package {
  __typename: 'NodePackage'
  id: string
  name: string | null
  version: string | null
  dependencies: RepositoriesQuery_organization_repositories_nodes_object_Blob_package_dependencies[]
}

export interface RepositoriesQuery_organization_repositories_nodes_object_Blob {
  __typename: 'Blob'
  id: string
  /**
   * UTF8 text data or null if the Blob is binary
   */
  text: string | null
  package: RepositoriesQuery_organization_repositories_nodes_object_Blob_package | null
}

export type RepositoriesQuery_organization_repositories_nodes_object =
  | RepositoriesQuery_organization_repositories_nodes_object_Commit
  | RepositoriesQuery_organization_repositories_nodes_object_Blob

export interface RepositoriesQuery_organization_repositories_nodes {
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
  object: RepositoriesQuery_organization_repositories_nodes_object | null
}

export interface RepositoriesQuery_organization_repositories {
  __typename: 'RepositoryConnection'
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number
  /**
   * A list of nodes.
   */
  nodes: (RepositoriesQuery_organization_repositories_nodes | null)[] | null
}

export interface RepositoriesQuery_organization {
  __typename: 'Organization'
  id: string
  /**
   * A list of repositories that the user owns.
   */
  repositories: RepositoriesQuery_organization_repositories
}

export interface RepositoriesQuery {
  /**
   * Lookup a organization by login.
   */
  organization: RepositoriesQuery_organization | null
}
