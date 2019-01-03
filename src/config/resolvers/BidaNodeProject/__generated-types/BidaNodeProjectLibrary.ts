/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BidaNodeProjectLibrary
// ====================================================

export interface BidaNodeProjectLibrary_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  name: string
  version: string
}

export interface BidaNodeProjectLibrary {
  __typename: 'BidaNodeLibrary'
  id: string
  date: string
  license: string | null
  name: string
  version: string
  dependents: BidaNodeProjectLibrary_dependents[]
}
