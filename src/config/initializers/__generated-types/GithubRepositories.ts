/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GithubRepositories
// ====================================================

export interface GithubRepositories_organization_repositories_nodes_package_Commit {
  __typename: 'Commit' | 'Tree' | 'Tag'
}

export interface GithubRepositories_organization_repositories_nodes_package_Blob {
  __typename: 'Blob'
  id: string
  /**
   * UTF8 text data or null if the Blob is binary
   */
  text: string | null
}

export type GithubRepositories_organization_repositories_nodes_package =
  | GithubRepositories_organization_repositories_nodes_package_Commit
  | GithubRepositories_organization_repositories_nodes_package_Blob

export interface GithubRepositories_organization_repositories_nodes {
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
  package: GithubRepositories_organization_repositories_nodes_package | null
}

export interface GithubRepositories_organization_repositories {
  __typename: 'RepositoryConnection'
  /**
   * A list of nodes.
   */
  nodes: (GithubRepositories_organization_repositories_nodes | null)[] | null
}

export interface GithubRepositories_organization {
  __typename: 'Organization'
  id: string
  /**
   * A list of repositories that the user owns.
   */
  repositories: GithubRepositories_organization_repositories
}

export interface GithubRepositories {
  /**
   * Lookup a organization by login.
   */
  organization: GithubRepositories_organization | null
}
