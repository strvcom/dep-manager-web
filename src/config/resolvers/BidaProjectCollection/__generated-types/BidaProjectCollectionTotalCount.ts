/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: BidaProjectCollectionTotalCount
// ====================================================

export interface BidaProjectCollectionTotalCount_nodes {
  __typename: 'BidaNodeProject' | 'BidaIOSProject' | 'BidaAndroidProject'
  id: string
}

export interface BidaProjectCollectionTotalCount {
  __typename: 'BidaProjectCollection'
  id: BidaDepartment
  nodes: BidaProjectCollectionTotalCount_nodes[]
}
