/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GithubRepositoriesQuery
// ====================================================

export interface GithubRepositoriesQuery_organization_repositories_nodes_object_Commit {
  __typename: 'Commit' | 'Tree' | 'Tag'
}

export interface GithubRepositoriesQuery_organization_repositories_nodes_object_Blob_package_dependencies {
  __typename: 'NodePackageDependency'
  id: string
  name: string
  version: string
}

export interface GithubRepositoriesQuery_organization_repositories_nodes_object_Blob_package {
  __typename: 'NodePackage'
  id: string
  dependencies: GithubRepositoriesQuery_organization_repositories_nodes_object_Blob_package_dependencies[]
}

export interface GithubRepositoriesQuery_organization_repositories_nodes_object_Blob {
  __typename: 'Blob'
  id: string
  /**
   * UTF8 text data or null if the Blob is binary
   */
  text: string | null
  package: GithubRepositoriesQuery_organization_repositories_nodes_object_Blob_package | null
}

export type GithubRepositoriesQuery_organization_repositories_nodes_object =
  | GithubRepositoriesQuery_organization_repositories_nodes_object_Commit
  | GithubRepositoriesQuery_organization_repositories_nodes_object_Blob

export interface GithubRepositoriesQuery_organization_repositories_nodes {
  __typename: 'Repository'
  /**
   * The name of the repository.
   */
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
  object: GithubRepositoriesQuery_organization_repositories_nodes_object | null
}

export interface GithubRepositoriesQuery_organization_repositories {
  __typename: 'RepositoryConnection'
  /**
   * A list of nodes.
   */
  nodes:
    | (GithubRepositoriesQuery_organization_repositories_nodes | null)[]
    | null
}

export interface GithubRepositoriesQuery_organization {
  __typename: 'Organization'
  id: string
  /**
   * A list of repositories that the user owns.
   */
  repositories: GithubRepositoriesQuery_organization_repositories
}

export interface GithubRepositoriesQuery {
  /**
   * Lookup a organization by login.
   */
  organization: GithubRepositoriesQuery_organization | null
}
