/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: BidaLibraryCollectionNodes
// ====================================================

export interface BidaLibraryCollectionNodes_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
}

export interface BidaLibraryCollectionNodes {
  __typename: 'BidaLibraryCollection'
  id: string
  from: any | null
  department: BidaDepartment
  nodes: BidaLibraryCollectionNodes_nodes[]
}
