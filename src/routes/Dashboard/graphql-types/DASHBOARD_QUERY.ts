/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { BidaDepartment, SemverOutdateStatus } from "./../../../generated/graphql-types";

// ====================================================
// GraphQL query operation: DASHBOARD_QUERY
// ====================================================

export interface DASHBOARD_QUERY_projects_edges_node_Issue {
  __typename: "Issue" | "PullRequest" | "User" | "Organization" | "MarketplaceListing" | "Dependent";
}

export interface DASHBOARD_QUERY_projects_edges_node_Repository_npmPackage_dependencies_package {
  __typename: "NPMPackage";
  id: string;
  name: string;
  version: string;
  license: string | null;
  updatedAt: string | null;
}

export interface DASHBOARD_QUERY_projects_edges_node_Repository_npmPackage_dependencies {
  __typename: "NPMDependency";
  id: string;
  name: string;
  outdateStatus: SemverOutdateStatus | null;
  package: DASHBOARD_QUERY_projects_edges_node_Repository_npmPackage_dependencies_package;
}

export interface DASHBOARD_QUERY_projects_edges_node_Repository_npmPackage {
  __typename: "NPMPackage";
  id: string;
  dependencies: (DASHBOARD_QUERY_projects_edges_node_Repository_npmPackage_dependencies | null)[];
}

export interface DASHBOARD_QUERY_projects_edges_node_Repository {
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
  npmPackage: DASHBOARD_QUERY_projects_edges_node_Repository_npmPackage | null;
}

export type DASHBOARD_QUERY_projects_edges_node = DASHBOARD_QUERY_projects_edges_node_Issue | DASHBOARD_QUERY_projects_edges_node_Repository;

export interface DASHBOARD_QUERY_projects_edges {
  __typename: "SearchResultItemEdge";
  /**
   * A cursor for use in pagination.
   */
  cursor: string;
  /**
   * The item at the end of the edge.
   */
  node: DASHBOARD_QUERY_projects_edges_node | null;
}

export interface DASHBOARD_QUERY_projects {
  __typename: "SearchResultItemConnection";
  /**
   * The number of repositories that matched the search query.
   */
  total: number;
  /**
   * A list of edges.
   */
  edges: (DASHBOARD_QUERY_projects_edges | null)[] | null;
}

export interface DASHBOARD_QUERY_archived {
  __typename: "SearchResultItemConnection";
  /**
   * The number of repositories that matched the search query.
   */
  total: number;
}

export interface DASHBOARD_QUERY {
  /**
   * Search projects within a department
   */
  projects: DASHBOARD_QUERY_projects;
  /**
   * Search projects within a department
   */
  archived: DASHBOARD_QUERY_archived;
}

export interface DASHBOARD_QUERYVariables {
  department: BidaDepartment;
}
