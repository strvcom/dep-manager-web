/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TotalDependentsCountRoot
// ====================================================

export interface TotalDependentsCountRoot_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
}

export interface TotalDependentsCountRoot {
  __typename: 'BidaNodeLibrary'
  id: string
  dependents: TotalDependentsCountRoot_dependents[]
}
