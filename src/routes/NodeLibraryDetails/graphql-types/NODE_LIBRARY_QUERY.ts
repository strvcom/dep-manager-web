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
  id: string;
  /**
   * The name of the repository.
   */
  name: string;
}

export interface NODE_LIBRARY_QUERY_library_dependents_edges_node_Dependent {
  __typename: "Dependent";
  id: string;
  version: string;
  outdateStatus: SemverOutdateStatus;
  repository: NODE_LIBRARY_QUERY_library_dependents_edges_node_Dependent_repository;
}

export type NODE_LIBRARY_QUERY_library_dependents_edges_node = NODE_LIBRARY_QUERY_library_dependents_edges_node_Issue | NODE_LIBRARY_QUERY_library_dependents_edges_node_Dependent;

export interface NODE_LIBRARY_QUERY_library_dependents_edges {
  __typename: "SearchResultItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: NODE_LIBRARY_QUERY_library_dependents_edges_node | null;
}

export interface NODE_LIBRARY_QUERY_library_dependents {
  __typename: "SearchResultItemConnection";
  /**
   * A list of edges.
   */
  edges: (NODE_LIBRARY_QUERY_library_dependents_edges | null)[] | null;
}

export interface NODE_LIBRARY_QUERY_library {
  __typename: "NPMPackage";
  id: string;
  name: string;
  version: string | null;
  dependents: NODE_LIBRARY_QUERY_library_dependents | null;
}

export interface NODE_LIBRARY_QUERY {
  library: NODE_LIBRARY_QUERY_library | null;
}

export interface NODE_LIBRARY_QUERYVariables {
  name: string;
  department: BidaDepartment;
}
