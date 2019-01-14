/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NodeProjectDependencies
// ====================================================

export interface NodeProjectDependencies_dependencies {
  __typename: 'BidaNodeProjectDependency'
  id: string
  name: string
  version: string
}

export interface NodeProjectDependencies {
  __typename: 'BidaNodeProject'
  id: string
  name: string
  dependencies: NodeProjectDependencies_dependencies[]
}
