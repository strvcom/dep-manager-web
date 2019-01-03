/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL query operation: LibrariesQuery
// ====================================================

export interface LibrariesQuery_libraries {
  __typename: 'BidaLibraryCollection'
  id: string
  from: any | null
  to: any | null
  projectId: string | null
  department: BidaDepartment
}

export interface LibrariesQuery {
  /**
   * Lookup a collection of library by department and range or project name
   */
  libraries: LibrariesQuery_libraries
}

export interface LibrariesQueryVariables {
  department: BidaDepartment
  from?: any | null
  to?: any | null
  projectId?: string | null
}
