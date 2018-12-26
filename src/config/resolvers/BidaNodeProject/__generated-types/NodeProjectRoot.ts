/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: NodeProjectRoot
// ====================================================

export interface NodeProjectRoot_dependencies {
  __typename: 'BidaNodeProjectDependency'
  id: string
  name: string
  version: string
}

export interface NodeProjectRoot {
  __typename: 'BidaNodeProject'
  id: string
  department: BidaDepartment
  dependencies: NodeProjectRoot_dependencies[]
}
