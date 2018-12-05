/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RepositoryQuery
// ====================================================

export interface RepositoryQuery_repository_object_Commit {
  __typename: 'Commit' | 'Tree' | 'Tag'
}

export interface RepositoryQuery_repository_object_Blob_package_dependencies_library {
  __typename: 'NodeLibrary'
  id: string
  version: string
  license: string
}

export interface RepositoryQuery_repository_object_Blob_package_dependencies {
  __typename: 'NodePackageDependency'
  id: string
  name: string
  version: string
  library: RepositoryQuery_repository_object_Blob_package_dependencies_library
}

export interface RepositoryQuery_repository_object_Blob_package {
  __typename: 'NodePackage'
  id: string
  name: string | null
  version: string | null
  dependencies: RepositoryQuery_repository_object_Blob_package_dependencies[]
}

export interface RepositoryQuery_repository_object_Blob {
  __typename: 'Blob'
  id: string
  package: RepositoryQuery_repository_object_Blob_package | null
}

export type RepositoryQuery_repository_object =
  | RepositoryQuery_repository_object_Commit
  | RepositoryQuery_repository_object_Blob

export interface RepositoryQuery_repository {
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
   * A Git object in the repository
   */
  object: RepositoryQuery_repository_object | null
}

export interface RepositoryQuery {
  /**
   * Lookup a given repository by the owner and repository name.
   */
  repository: RepositoryQuery_repository | null
}

export interface RepositoryQueryVariables {
  name: string
}
