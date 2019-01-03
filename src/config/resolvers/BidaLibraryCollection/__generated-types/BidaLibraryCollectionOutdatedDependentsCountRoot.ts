/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: BidaLibraryCollectionOutdatedDependentsCountRoot
// ====================================================

export interface BidaLibraryCollectionOutdatedDependentsCountRoot_nodes_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  version: string
}

export interface BidaLibraryCollectionOutdatedDependentsCountRoot_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  version: string
  dependents: BidaLibraryCollectionOutdatedDependentsCountRoot_nodes_dependents[]
}

export interface BidaLibraryCollectionOutdatedDependentsCountRoot {
  __typename: 'BidaLibraryCollection'
  id: string
  department: BidaDepartment
  nodes: BidaLibraryCollectionOutdatedDependentsCountRoot_nodes[]
  projectId: string | null
}
