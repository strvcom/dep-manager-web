/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment, SemverOutdateStatus } from "./../../../generated/graphql-types";

// ====================================================
// GraphQL query operation: NODE_LIBRARY_QUERY
// ====================================================

export interface NODE_LIBRARY_QUERY_library_dependents_edges_node_Issue {
  __typename: "Issue" | "PullRequest" | "Repository" | "User" | "Organization" | "MarketplaceListing";
}

export interface NODE_LIBRARY_QUERY_library_dependents_edges_node_Dependent_repository {
  __typename: "Repository";
  /**
   * The name of the repository.
   */
  name: string;
  id: string;
}

export interface NODE_LIBRARY_QUERY_library_dependents_edges_node_Dependent {
  __typename: "Dependent";
  id: string;
  outdateStatus: SemverOutdateStatus;
  repository: NODE_LIBRARY_QUERY_library_dependents_edges_node_Dependent_repository;
  version: string;
}

export type NODE_LIBRARY_QUERY_library_dependents_edges_node = NODE_LIBRARY_QUERY_library_dependents_edges_node_Issue | NODE_LIBRARY_QUERY_library_dependents_edges_node_Dependent;

export interface NODE_LIBRARY_QUERY_library_dependents_edges {
  __typename: "SearchResultItemEdge";
  node: NODE_LIBRARY_QUERY_library_dependents_edges_node;
}

export interface NODE_LIBRARY_QUERY_library_dependents {
  __typename: "SearchResultItemConnection";
  edges: NODE_LIBRARY_QUERY_library_dependents_edges[];
}

export interface NODE_LIBRARY_QUERY_library {
  __typename: "NPMPackage";
  id: string;
  name: string;
  version: string;
  dependents: NODE_LIBRARY_QUERY_library_dependents;
}

export interface NODE_LIBRARY_QUERY {
  library: NODE_LIBRARY_QUERY_library | null;
}

export interface NODE_LIBRARY_QUERYVariables {
  name: string;
  department: BidaDepartment;
}
