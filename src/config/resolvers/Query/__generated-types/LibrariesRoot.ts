/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL query operation: LibrariesRoot
// ====================================================

export interface LibrariesRoot_libraries_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  date: string
}

export interface LibrariesRoot_libraries {
  __typename: 'BidaLibraryCollection'
  id: string
  department: BidaDepartment
  nodes: LibrariesRoot_libraries_nodes[]
}

export interface LibrariesRoot {
  /**
   * Lookup a collection of library by department and range or project name
   */
  libraries: LibrariesRoot_libraries
}

export interface LibrariesRootVariables {
  department: BidaDepartment
  from?: any | null
  to?: any | null
  projectName?: string | null
}
