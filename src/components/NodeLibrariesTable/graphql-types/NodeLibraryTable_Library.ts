/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NodeLibraryTable_Library
// ====================================================

export interface NodeLibraryTable_Library_package {
  __typename: "NPMPackage";
  id: string;
  name: string;
  license: string | null;
}

export interface NodeLibraryTable_Library {
  __typename: "NPMDependency";
  id: string;
  package: NodeLibraryTable_Library_package;
}
