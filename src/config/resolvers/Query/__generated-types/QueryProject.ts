/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: QueryProject
// ====================================================

export interface QueryProject_dependencies {
  __typename: 'BidaNodeProjectDependency'
  id: string
  name: string
  version: string
}

export interface QueryProject {
  __typename: 'BidaNodeProject'
  id: string
  name: string
  url: string
  dependencies: QueryProject_dependencies[]
}
