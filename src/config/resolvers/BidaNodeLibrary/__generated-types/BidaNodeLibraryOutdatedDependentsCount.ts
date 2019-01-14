/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BidaNodeLibraryOutdatedDependentsCount
// ====================================================

export interface BidaNodeLibraryOutdatedDependentsCount_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  version: string
}

export interface BidaNodeLibraryOutdatedDependentsCount {
  __typename: 'BidaNodeLibrary'
  id: string
  version: string
  dependents: BidaNodeLibraryOutdatedDependentsCount_dependents[]
}
