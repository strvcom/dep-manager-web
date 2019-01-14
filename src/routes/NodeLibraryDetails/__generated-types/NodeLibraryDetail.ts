/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NodeLibraryDetail
// ====================================================

export interface NodeLibraryDetail_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  version: string
  name: string
}

export interface NodeLibraryDetail {
  __typename: 'BidaNodeLibrary'
  id: string
  name: string
  version: string
  dependents: NodeLibraryDetail_dependents[]
  outdatedDependentsCount: number
  totalDependentsCount: number
}
