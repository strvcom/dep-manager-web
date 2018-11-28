/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NodeLibrary
// ====================================================

export interface NodeLibrary_dependents {
  __typename: 'NodeLibraryDependent'
  id: string
  name: string
  version: string
}

export interface NodeLibrary {
  __typename: 'NodeLibrary'
  id: string
  name: string
  version: string
  date: string
  outdatedDependents: number
  alertedDependents: number
  dependents: NodeLibrary_dependents[]
}
