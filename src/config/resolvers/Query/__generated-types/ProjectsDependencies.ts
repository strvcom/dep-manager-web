/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL query operation: ProjectsDependencies
// ====================================================

export interface ProjectsDependencies_projects_nodes_BidaIOSProject {
  __typename: 'BidaIOSProject' | 'BidaAndroidProject'
  id: string
  name: string
}

export interface ProjectsDependencies_projects_nodes_BidaNodeProject_dependencies {
  __typename: 'BidaNodeProjectDependency'
  id: string
  name: string
  version: string
}

export interface ProjectsDependencies_projects_nodes_BidaNodeProject {
  __typename: 'BidaNodeProject'
  id: string
  name: string
  dependencies: ProjectsDependencies_projects_nodes_BidaNodeProject_dependencies[]
}

export type ProjectsDependencies_projects_nodes =
  | ProjectsDependencies_projects_nodes_BidaIOSProject
  | ProjectsDependencies_projects_nodes_BidaNodeProject

export interface ProjectsDependencies_projects {
  __typename: 'BidaProjectCollection'
  id: BidaDepartment
  nodes: ProjectsDependencies_projects_nodes[]
}

export interface ProjectsDependencies {
  /**
   * Lookup a collection of project by department
   */
  projects: ProjectsDependencies_projects
}

export interface ProjectsDependenciesVariables {
  department: BidaDepartment
}
