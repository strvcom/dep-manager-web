/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Repositories
// ====================================================

export interface Repositories_nodes_object_Commit {
  __typename: 'Commit' | 'Tree' | 'Tag'
}

export interface Repositories_nodes_object_Blob_package_dependencies {
  __typename: 'NodePackageDependency'
  id: string
  name: string
  version: string
}

export interface Repositories_nodes_object_Blob_package {
  __typename: 'NodePackage'
  id: string
  name: string | null
  version: string | null
  outdatedLibraries: number
  alertedLibraries: number
  dependencies: Repositories_nodes_object_Blob_package_dependencies[]
}

export interface Repositories_nodes_object_Blob {
  __typename: 'Blob'
  id: string
  /**
   * UTF8 text data or null if the Blob is binary
   */
  text: string | null
  package: Repositories_nodes_object_Blob_package | null
}

export type Repositories_nodes_object =
  | Repositories_nodes_object_Commit
  | Repositories_nodes_object_Blob

export interface Repositories_nodes {
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
  object: Repositories_nodes_object | null
}

export interface Repositories {
  __typename: 'RepositoryConnection'
  /**
   * A list of nodes.
   */
  nodes: (Repositories_nodes | null)[] | null
}
