/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SemverOutdateStatus } from "./../../../generated/graphql-types";

// ====================================================
// GraphQL fragment: NodeProjectsTable_projects
// ====================================================

export interface NodeProjectsTable_projects_npmPackage_dependencies_package {
  __typename: "NPMPackage";
  id: string;
  name: string;
  version: string;
  license: string | null;
  updatedAt: string | null;
}

export interface NodeProjectsTable_projects_npmPackage_dependencies {
  __typename: "NPMDependency";
  id: string;
  name: string;
  outdateStatus: SemverOutdateStatus | null;
  package: NodeProjectsTable_projects_npmPackage_dependencies_package;
}

export interface NodeProjectsTable_projects_npmPackage {
  __typename: "NPMPackage";
  id: string;
  dependencies: (NodeProjectsTable_projects_npmPackage_dependencies | null)[];
}

export interface NodeProjectsTable_projects {
  __typename: "Repository";
  id: string;
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * Identifies when the repository was last pushed to.
   */
  pushedAt: any | null;
  npmPackage: NodeProjectsTable_projects_npmPackage | null;
}
