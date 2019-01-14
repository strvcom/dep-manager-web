/* tslint:disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment } from './../../../../data/__generated-types'

// ====================================================
// GraphQL query operation: ProjectResolver
// ====================================================

export interface ProjectResolver_project {
  __typename: 'BidaNodeProject' | 'BidaIOSProject' | 'BidaAndroidProject'
  id: string
}

export interface ProjectResolver {
  /**
   * Lookup a project by department and id
   */
  project: ProjectResolver_project
}

export interface ProjectResolverVariables {
  department: BidaDepartment
  id: string
}
