/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Department, RangeInput } from './../../__generated-types'

// ====================================================
// GraphQL query operation: LibrariesQuery
// ====================================================

export interface LibrariesQuery_libraries_dependents {
  __typename: 'NodeLibraryDependent'
  id: string
  name: string
  version: string
}

export interface LibrariesQuery_libraries {
  __typename: 'NodeLibrary'
  id: string
  name: string
  version: string
  date: string
  dependents: LibrariesQuery_libraries_dependents[]
}

export interface LibrariesQuery {
  libraries: LibrariesQuery_libraries[]
}

export interface LibrariesQueryVariables {
  department: Department
  range?: RangeInput | null
}
