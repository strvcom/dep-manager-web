/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL query operation: OutdatedDependentsCountQuery
// ====================================================

export interface OutdatedDependentsCountQuery_libraries_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  outdatedDependents: number
}

export interface OutdatedDependentsCountQuery_libraries {
  __typename: 'BidaLibraryCollection'
  id: string
  department: BidaDepartment
  nodes: OutdatedDependentsCountQuery_libraries_nodes[]
}

export interface OutdatedDependentsCountQuery {
  /**
   * Lookup a collection of library by department and range or project name
   */
  libraries: OutdatedDependentsCountQuery_libraries
}

export interface OutdatedDependentsCountQueryVariables {
  department: BidaDepartment
}
