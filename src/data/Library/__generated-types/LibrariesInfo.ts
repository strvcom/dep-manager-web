/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../__generated-types'

// ====================================================
// GraphQL query operation: LibrariesInfo
// ====================================================

export interface LibrariesInfo_libraries {
  __typename: 'BidaLibraryCollection'
  totalCount: number
  alertedDependentsCount: number
  outdatedDependentsCount: number
}

export interface LibrariesInfo {
  /**
   * Lookup a collection of library by department and range or project name
   */
  libraries: LibrariesInfo_libraries
}

export interface LibrariesInfoVariables {
  department: BidaDepartment
  from?: any | null
  to?: any | null
  projectName?: string | null
}
