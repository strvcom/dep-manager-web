/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL query operation: NodeLibraries
// ====================================================

export interface NodeLibraries_libraries_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  version: string
}

export interface NodeLibraries_libraries {
  __typename: 'BidaLibraryCollection'
  nodes: NodeLibraries_libraries_nodes[]
}

export interface NodeLibraries {
  /**
   * Lookup a collection of library by department and range or project name
   */
  libraries: NodeLibraries_libraries
}

export interface NodeLibrariesVariables {
  department: BidaDepartment
}
