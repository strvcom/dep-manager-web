/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BidaNodeLibrary
// ====================================================

export interface BidaNodeLibrary_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  name: string
  version: string
}

export interface BidaNodeLibrary {
  __typename: 'BidaNodeLibrary'
  id: string
  license: string | null
  date: string
  name: string
  version: string
  dependents: BidaNodeLibrary_dependents[]
}
