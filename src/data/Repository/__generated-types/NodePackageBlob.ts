/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NodePackageBlob
// ====================================================

export interface NodePackageBlob_package_dependencies {
  __typename: 'NodePackageDependency'
  id: string
  name: string
  version: string
}

export interface NodePackageBlob_package {
  __typename: 'NodePackage'
  id: string
  name: string | null
  version: string | null
  outdatedLibraries: number
  alertedLibraries: number
  dependencies: NodePackageBlob_package_dependencies[]
}

export interface NodePackageBlob {
  __typename: 'Blob'
  id: string
  /**
   * UTF8 text data or null if the Blob is binary
   */
  text: string | null
  package: NodePackageBlob_package | null
}
