/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: QueryLibrary
// ====================================================

export interface QueryLibrary_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  version: string
  name: string
}

export interface QueryLibrary {
  __typename: 'BidaNodeLibrary'
  id: string
  date: string
  name: string
  version: string
  dependents: QueryLibrary_dependents[]
}
