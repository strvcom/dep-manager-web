/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Nodes
// ====================================================

export interface Nodes_nodes_dependents {
  __typename: 'BidaNodeLibraryDependent'
  version: string
}

export interface Nodes_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  date: string
  name: string
  version: string
  dependents: Nodes_nodes_dependents[]
}

export interface Nodes {
  __typename: 'BidaLibraryCollection'
  nodes: Nodes_nodes[]
}
