/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NodeProjectsDependencies
// ====================================================

export interface NodeProjectsDependencies_nodes_BidaIOSProject {
  __typename: 'BidaIOSProject' | 'BidaAndroidProject'
}

export interface NodeProjectsDependencies_nodes_BidaNodeProject_dependencies {
  __typename: 'BidaNodeProjectDependency'
  id: string
  name: string
  version: string
}

export interface NodeProjectsDependencies_nodes_BidaNodeProject {
  __typename: 'BidaNodeProject'
  id: string
  name: string
  dependencies: NodeProjectsDependencies_nodes_BidaNodeProject_dependencies[]
}

export type NodeProjectsDependencies_nodes =
  | NodeProjectsDependencies_nodes_BidaIOSProject
  | NodeProjectsDependencies_nodes_BidaNodeProject

export interface NodeProjectsDependencies {
  __typename: 'BidaProjectCollection'
  nodes: NodeProjectsDependencies_nodes[]
}
