/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: OutdatedDependentsCountRoot
// ====================================================

export interface OutdatedDependentsCountRoot_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  outdatedDependentsCount: number
}

export interface OutdatedDependentsCountRoot {
  __typename: 'BidaLibraryCollection'
  id: string
  department: BidaDepartment
  nodes: OutdatedDependentsCountRoot_nodes[]
}
