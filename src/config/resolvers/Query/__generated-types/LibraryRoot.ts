/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL query operation: LibraryRoot
// ====================================================

export interface LibraryRoot_library_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  version: string
  name: string
}

export interface LibraryRoot_library {
  __typename: 'BidaNodeLibrary'
  id: string
  date: string
  name: string
  version: string
  dependents: LibraryRoot_library_dependents[]
}

export interface LibraryRoot {
  /**
   * Lookup a single library by it's id and department
   */
  library: LibraryRoot_library
}

export interface LibraryRootVariables {
  id: string
  department: BidaDepartment
}
