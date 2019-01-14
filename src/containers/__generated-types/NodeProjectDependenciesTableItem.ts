/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NodeProjectDependenciesTableItem
// ====================================================

export interface NodeProjectDependenciesTableItem_library {
  __typename: 'BidaNodeLibrary'
  id: string
  version: string
  license: string | null
}

export interface NodeProjectDependenciesTableItem {
  __typename: 'BidaNodeProjectDependency'
  id: string
  name: string
  version: string
  library: NodeProjectDependenciesTableItem_library
}
