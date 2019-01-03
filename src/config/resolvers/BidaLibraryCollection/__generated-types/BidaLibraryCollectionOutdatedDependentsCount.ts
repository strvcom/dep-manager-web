/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: BidaLibraryCollectionOutdatedDependentsCount
// ====================================================

export interface BidaLibraryCollectionOutdatedDependentsCount_nodes_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  version: string
}

export interface BidaLibraryCollectionOutdatedDependentsCount_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  version: string
  dependents: BidaLibraryCollectionOutdatedDependentsCount_nodes_dependents[]
}

export interface BidaLibraryCollectionOutdatedDependentsCount {
  __typename: 'BidaLibraryCollection'
  id: string
  department: BidaDepartment
  nodes: BidaLibraryCollectionOutdatedDependentsCount_nodes[]
}
