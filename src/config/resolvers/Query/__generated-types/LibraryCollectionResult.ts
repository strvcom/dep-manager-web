/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: LibraryCollectionResult
// ====================================================

export interface LibraryCollectionResult_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  date: string
}

export interface LibraryCollectionResult {
  __typename: 'BidaLibraryCollection'
  id: string
  department: BidaDepartment
  nodes: LibraryCollectionResult_nodes[]
}
