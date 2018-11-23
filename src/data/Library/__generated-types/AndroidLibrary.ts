/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AndroidLibrary
// ====================================================

export interface AndroidLibrary_dependents {
  __typename: 'NodeLibraryDependent'
  id: string
  name: string
  version: string
}

export interface AndroidLibrary {
  __typename: 'AndroidLibrary'
  id: string
  name: string
  version: string
  dependents: AndroidLibrary_dependents[]
}
