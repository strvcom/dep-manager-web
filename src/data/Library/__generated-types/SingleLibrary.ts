/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../__generated-types'

// ====================================================
// GraphQL query operation: SingleLibrary
// ====================================================

export interface SingleLibrary_library {
  __typename: 'BidaNodeLibrary'
  id: string
  name: string
}

export interface SingleLibrary {
  /**
   * Lookup a single library by it's id and department
   */
  library: SingleLibrary_library
}

export interface SingleLibraryVariables {
  id: string
  department: BidaDepartment
}
