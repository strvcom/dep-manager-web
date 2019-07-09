/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SemverOutdateStatus } from "./../../../generated/graphql-types";

// ====================================================
// GraphQL fragment: NodeProjectsDependenciesTable_dependencies
// ====================================================

export interface NodeProjectsDependenciesTable_dependencies_package {
  __typename: "NPMPackage";
  id: string;
  name: string;
  license: string | null;
  version: string;
  updatedAt: string | null;
}

export interface NodeProjectsDependenciesTable_dependencies {
  __typename: "NPMDependency";
  id: string;
  version: string;
  outdateStatus: SemverOutdateStatus | null;
  name: string;
  package: NodeProjectsDependenciesTable_dependencies_package;
}
