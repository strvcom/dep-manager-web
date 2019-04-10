/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../config/types'

// ====================================================
// GraphQL query operation: NodeLibraryDetailsData
// ====================================================

export interface NodeLibraryDetailsData_library_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  version: string
  name: string
}

export interface NodeLibraryDetailsData_library {
  __typename: 'BidaNodeLibrary'
  id: string
  name: string
  version: string
  dependents: NodeLibraryDetailsData_library_dependents[]
  outdatedDependentsCount: number
  totalDependentsCount: number
}

export interface NodeLibraryDetailsData {
  /**
   * Lookup a single library by it's id and department
   */
  library: NodeLibraryDetailsData_library
}

export interface NodeLibraryDetailsDataVariables {
  id: string
  department: BidaDepartment
}
