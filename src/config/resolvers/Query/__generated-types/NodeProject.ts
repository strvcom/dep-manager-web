/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: NodeProject
// ====================================================

export interface NodeProject_dependencies {
  __typename: 'BidaNodeProjectDependency'
  id: string
  name: string
  version: string
}

export interface NodeProject {
  __typename: 'BidaNodeProject'
  id: string
  name: string
  url: string
  pushedAt: string
  department: BidaDepartment
  isArchived: boolean
  version: string | null
  dependencies: NodeProject_dependencies[]
}
