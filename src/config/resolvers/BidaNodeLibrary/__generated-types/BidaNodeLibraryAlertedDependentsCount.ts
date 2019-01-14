/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BidaNodeLibraryAlertedDependentsCount
// ====================================================

export interface BidaNodeLibraryAlertedDependentsCount_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  version: string
}

export interface BidaNodeLibraryAlertedDependentsCount {
  __typename: 'BidaNodeLibrary'
  id: string
  version: string
  dependents: BidaNodeLibraryAlertedDependentsCount_dependents[]
}
