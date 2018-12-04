/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RepositoryDetails
// ====================================================

export interface RepositoryDetails_object_Commit {
  __typename: 'Commit' | 'Tree' | 'Tag'
}

export interface RepositoryDetails_object_Blob_package_dependencies_library {
  __typename: 'NodeLibrary'
  id: string
  version: string
  license: string
}

export interface RepositoryDetails_object_Blob_package_dependencies {
  __typename: 'NodePackageDependency'
  id: string
  name: string
  version: string
  library: RepositoryDetails_object_Blob_package_dependencies_library
}

export interface RepositoryDetails_object_Blob_package {
  __typename: 'NodePackage'
  id: string
  name: string | null
  version: string | null
  dependencies: RepositoryDetails_object_Blob_package_dependencies[]
}

export interface RepositoryDetails_object_Blob {
  __typename: 'Blob'
  package: RepositoryDetails_object_Blob_package | null
}

export type RepositoryDetails_object =
  | RepositoryDetails_object_Commit
  | RepositoryDetails_object_Blob

export interface RepositoryDetails {
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
  object: RepositoryDetails_object | null
}
