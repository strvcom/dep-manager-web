/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL query operation: ProjectsRoot
// ====================================================

export interface ProjectsRoot_projects {
  __typename: 'BidaProjectCollection'
  id: BidaDepartment
}

export interface ProjectsRoot {
  /**
   * Lookup a collection of project by department
   */
  projects: ProjectsRoot_projects
}

export interface ProjectsRootVariables {
  department: BidaDepartment
}
