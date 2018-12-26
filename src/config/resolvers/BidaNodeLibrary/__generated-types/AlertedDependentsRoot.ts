/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AlertedDependentsRoot
// ====================================================

export interface AlertedDependentsRoot_dependents {
  __typename: 'BidaNodeLibraryDependent'
  version: string
}

export interface AlertedDependentsRoot {
  __typename: 'BidaNodeLibrary'
  version: string
  dependents: AlertedDependentsRoot_dependents[]
}
