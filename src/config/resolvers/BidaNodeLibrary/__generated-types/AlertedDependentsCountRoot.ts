/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AlertedDependentsCountRoot
// ====================================================

export interface AlertedDependentsCountRoot_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  version: string
}

export interface AlertedDependentsCountRoot {
  __typename: 'BidaNodeLibrary'
  id: string
  version: string
  dependents: AlertedDependentsCountRoot_dependents[]
}
