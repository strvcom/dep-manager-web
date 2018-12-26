/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../__generated-types'

// ====================================================
// GraphQL query operation: AllLibraries
// ====================================================

export interface AllLibraries_libraries_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  name: string
  date: string
  totalDependents: number
  outdatedDependents: number
  alertedDependents: number
  license: string | null
  version: string
}

export interface AllLibraries_libraries {
  __typename: 'BidaLibraryCollection'
  id: string
  nodes: AllLibraries_libraries_nodes[]
}

export interface AllLibraries {
  /**
   * Lookup a collection of library by department and range or project name
   */
  libraries: AllLibraries_libraries
}

export interface AllLibrariesVariables {
  department: BidaDepartment
  from?: any | null
  to?: any | null
  projectName?: string | null
}
