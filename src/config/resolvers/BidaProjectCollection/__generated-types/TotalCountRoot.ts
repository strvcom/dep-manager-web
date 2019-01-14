/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: TotalCountRoot
// ====================================================

export interface TotalCountRoot_nodes {
  __typename: 'BidaNodeProject' | 'BidaIOSProject' | 'BidaAndroidProject'
  id: string
}

export interface TotalCountRoot {
  __typename: 'BidaProjectCollection'
  id: BidaDepartment
  nodes: TotalCountRoot_nodes[]
}
