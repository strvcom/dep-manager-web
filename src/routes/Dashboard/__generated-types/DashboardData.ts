/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../data/__generated-types'

// ====================================================
// GraphQL query operation: DashboardData
// ====================================================

export interface DashboardData_projects_nodes_BidaIOSProject {
  __typename: 'BidaIOSProject' | 'BidaAndroidProject'
  id: string
  name: string
  url: string
  pushedAt: string
}

export interface DashboardData_projects_nodes_BidaNodeProject {
  __typename: 'BidaNodeProject'
  id: string
  name: string
  url: string
  pushedAt: string
  outdatedLibraries: number
  alertedLibraries: number
}

export type DashboardData_projects_nodes =
  | DashboardData_projects_nodes_BidaIOSProject
  | DashboardData_projects_nodes_BidaNodeProject

export interface DashboardData_projects {
  __typename: 'BidaProjectCollection'
  id: BidaDepartment
  totalCount: number
  totalArchived: number
  nodes: DashboardData_projects_nodes[]
}

export interface DashboardData_libraries_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  name: string
  date: string
  totalDependents: number
  outdatedDependents: number
  alertedDependents: number
  license: string | null
  version: string
}

export interface DashboardData_libraries {
  __typename: 'BidaLibraryCollection'
  id: string
  totalCount: number
  outdatedDependentsCount: number
  nodes: DashboardData_libraries_nodes[]
}

export interface DashboardData_recentLibraries_nodes {
  __typename: 'BidaNodeLibrary'
  id: string
  name: string
  date: string
  version: string
}

export interface DashboardData_recentLibraries {
  __typename: 'BidaLibraryCollection'
  id: string
  nodes: DashboardData_recentLibraries_nodes[]
}

export interface DashboardData {
  /**
   * Lookup a collection of project by department
   */
  projects: DashboardData_projects
  /**
   * Lookup a collection of library by department and range or project name
   */
  libraries: DashboardData_libraries
  /**
   * Lookup a collection of library by department and range or project name
   */
  recentLibraries: DashboardData_recentLibraries
}

export interface DashboardDataVariables {
  department: BidaDepartment
  from?: any | null
}
