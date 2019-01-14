/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BidaNodeLibraryTotalDependentsCount
// ====================================================

export interface BidaNodeLibraryTotalDependentsCount_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
}

export interface BidaNodeLibraryTotalDependentsCount {
  __typename: 'BidaNodeLibrary'
  id: string
  dependents: BidaNodeLibraryTotalDependentsCount_dependents[]
}
