/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BidaNodeProjectLibrariesResult
// ====================================================

export interface BidaNodeProjectLibrariesResult_nodes_dependents {
  __typename: 'BidaNodeLibraryDependent'
  id: string
  name: string
  version: string
}

export interface BidaNodeProjectLibrariesResult_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  date: string
  license: string | null
  name: string
  version: string
  dependents: BidaNodeProjectLibrariesResult_nodes_dependents[]
}

export interface BidaNodeProjectLibrariesResult {
  __typename: 'BidaLibraryCollection'
  from: any | null
  to: any | null
  id: string
  projectId: string | null
  nodes: BidaNodeProjectLibrariesResult_nodes[]
}
