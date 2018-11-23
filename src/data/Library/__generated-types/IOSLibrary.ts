/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: IOSLibrary
// ====================================================

export interface IOSLibrary_dependents {
  __typename: 'NodeLibraryDependent'
  id: string
  name: string
  version: string
}

export interface IOSLibrary {
  __typename: 'IOSLibrary'
  id: string
  name: string
  version: string
  dependents: IOSLibrary_dependents[]
}
