/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL fragment: BidaNodeProjectLibrariesRoot
// ====================================================

export interface BidaNodeProjectLibrariesRoot_dependencies {
  __typename: 'BidaNodeProjectDependency'
  id: string
  name: string
  version: string
}

export interface BidaNodeProjectLibrariesRoot {
  __typename: 'BidaNodeProject'
  id: string
  name: string
  department: BidaDepartment
  url: string
  dependencies: BidaNodeProjectLibrariesRoot_dependencies[]
}
