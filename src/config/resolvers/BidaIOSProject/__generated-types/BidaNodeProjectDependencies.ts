/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: BidaNodeProjectDependencies
// ====================================================

export interface BidaNodeProjectDependencies_dependencies {
  __typename: 'BidaNodeProjectDependency'
  id: string
  name: string
  version: string
}

export interface BidaNodeProjectDependencies {
  __typename: 'BidaNodeProject'
  id: string
  department: BidaDepartment
  dependencies: BidaNodeProjectDependencies_dependencies[]
}
