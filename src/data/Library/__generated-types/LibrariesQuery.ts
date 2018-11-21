/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LibrariesQuery
// ====================================================

export interface LibrariesQuery_libraries_nodes {
  __typename: 'NodeLibrary'
  id: string
  name: string
  version: string
}

export interface LibrariesQuery_libraries {
  __typename: 'LibraryCollection'
  nodes: LibrariesQuery_libraries_nodes[]
}

export interface LibrariesQuery {
  libraries: LibrariesQuery_libraries
}
