/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: OutdatedDependentsRoot
// ====================================================

export interface OutdatedDependentsRoot_dependents {
  __typename: 'BidaNodeLibraryDependent'
  version: string
}

export interface OutdatedDependentsRoot {
  __typename: 'BidaNodeLibrary'
  version: string
  dependents: OutdatedDependentsRoot_dependents[]
}
