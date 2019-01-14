/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: TotalArchivedRoot
// ====================================================

export interface TotalArchivedRoot_nodes {
  __typename: 'BidaNodeProject' | 'BidaIOSProject' | 'BidaAndroidProject'
  id: string
}

export interface TotalArchivedRoot {
  __typename: 'BidaProjectCollection'
  id: BidaDepartment
  nodes: TotalArchivedRoot_nodes[]
}
