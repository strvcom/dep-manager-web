/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: BidaProjectCollectionNodes
// ====================================================

export interface BidaProjectCollectionNodes_nodes {
  __typename: 'BidaNodeProject' | 'BidaIOSProject' | 'BidaAndroidProject'
  id: string
}

export interface BidaProjectCollectionNodes {
  __typename: 'BidaProjectCollection'
  id: BidaDepartment
  nodes: BidaProjectCollectionNodes_nodes[]
}
