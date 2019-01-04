/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DependenciesTableItem
// ====================================================

export interface DependenciesTableItem_library {
  __typename: 'BidaNodeLibrary'
  id: string
  version: string
  license: string | null
}

export interface DependenciesTableItem {
  __typename: 'BidaNodeProjectDependency'
  id: string
  name: string
  version: string
  library: DependenciesTableItem_library
}
