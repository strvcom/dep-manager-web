/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: LocalProjectCollection
// ====================================================

export interface LocalProjectCollection_nodes {
  __typename: 'BidaNodeProject' | 'BidaIOSProject' | 'BidaAndroidProject'
  id: string
  name: string
  url: string
  pushedAt: string
  isArchived: boolean
}

export interface LocalProjectCollection {
  __typename: 'BidaProjectCollection'
  id: BidaDepartment
  totalArchived: number
  totalCount: number
  nodes: LocalProjectCollection_nodes[]
}
