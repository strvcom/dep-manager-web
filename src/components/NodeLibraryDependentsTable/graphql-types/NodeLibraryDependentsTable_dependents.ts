/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SemverOutdateStatus } from "./../../../generated/graphql-types";

// ====================================================
// GraphQL fragment: NodeLibraryDependentsTable_dependents
// ====================================================

export interface NodeLibraryDependentsTable_dependents_repository {
  __typename: "Repository";
  id: string;
  /**
   * The name of the repository.
   */
  name: string;
}

export interface NodeLibraryDependentsTable_dependents {
  __typename: "Dependent";
  id: string;
  version: string;
  outdateStatus: SemverOutdateStatus;
  repository: NodeLibraryDependentsTable_dependents_repository;
}
