/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL query operation: QueryProjects
// ====================================================

export interface QueryProjects_projects {
  __typename: 'BidaProjectCollection'
  id: BidaDepartment
}

export interface QueryProjects {
  /**
   * Lookup a collection of project by department
   */
  projects: QueryProjects_projects
}

export interface QueryProjectsVariables {
  department: BidaDepartment
}
