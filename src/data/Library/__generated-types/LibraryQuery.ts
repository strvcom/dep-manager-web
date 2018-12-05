/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Department } from './../../__generated-types'

// ====================================================
// GraphQL query operation: LibraryQuery
// ====================================================

export interface LibraryQuery_library_dependents {
  __typename: 'NodeLibraryDependent'
  id: string
  name: string
  version: string
}

export interface LibraryQuery_library {
  __typename: 'NodeLibrary'
  id: string
  name: string
  version: string
  date: string
  license: string
  outdatedDependents: number
  alertedDependents: number
  totalDependents: number
  dependents: LibraryQuery_library_dependents[]
}

export interface LibraryQuery {
  library: LibraryQuery_library | null
}

export interface LibraryQueryVariables {
  id: string
  department: Department
}
