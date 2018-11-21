/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RepositoriesSearch
// ====================================================

export interface RepositoriesSearch_organization_repositories_pageInfo {
  endCursor: string | null // When paginating forwards, the cursor to continue.
  hasNextPage: boolean // When paginating forwards, are there more items?
  hasPreviousPage: boolean // When paginating backwards, are there more items?
  startCursor: string | null // When paginating backwards, the cursor to continue.
}

export interface RepositoriesSearch_organization_repositories_nodes_package_Commit {}

export interface RepositoriesSearch_organization_repositories_nodes_package_Blob {
  id: string
  text: string | null // UTF8 text data or null if the Blob is binary
}

export type RepositoriesSearch_organization_repositories_nodes_package =
  | RepositoriesSearch_organization_repositories_nodes_package_Commit
  | RepositoriesSearch_organization_repositories_nodes_package_Blob

export interface RepositoriesSearch_organization_repositories_nodes {
  id: string
  name: string // The name of the repository.
  url: any // The HTTP URL for this repository
  pushedAt: any | null // Identifies when the repository was last pushed to.
  isArchived: boolean // Indicates if the repository is unmaintained.
  package: RepositoriesSearch_organization_repositories_nodes_package | null // A Git object in the repository
}

export interface RepositoriesSearch_organization_repositories {
  totalCount: number // Identifies the total count of items in the connection.
  pageInfo: RepositoriesSearch_organization_repositories_pageInfo // Information to aid in pagination.
  nodes: (RepositoriesSearch_organization_repositories_nodes | null)[] | null // A list of nodes.
}

export interface RepositoriesSearch_organization {
  id: string
  repositories: RepositoriesSearch_organization_repositories // A list of repositories that the user owns.
}

export interface RepositoriesSearch {
  organization: RepositoriesSearch_organization | null // Lookup a organization by login.
}

export interface RepositoriesSearchVariables {
  after?: string | null
  before?: string | null
  first?: number | null
  last?: number | null
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RepositorySearch
// ====================================================

export interface RepositorySearch_repository {
  url: any // The HTTP URL for this repository
  name: string // The name of the repository.
}

export interface RepositorySearch {
  repository: RepositorySearch_repository | null // Lookup a given repository by the owner and repository name.
}

export interface RepositorySearchVariables {
  name: string
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_viewer {
  login: string // The username used to login.
  name: string | null // The user's public profile name.
  avatarUrl: any // A URL pointing to the user's public avatar.
}

export interface Me {
  viewer: Me_viewer // The currently authenticated user.
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Project
// ====================================================

export interface Project_package_Commit {}

export interface Project_package_Blob {
  id: string
  text: string | null // UTF8 text data or null if the Blob is binary
}

export type Project_package = Project_package_Commit | Project_package_Blob

export interface Project {
  id: string
  name: string // The name of the repository.
  url: any // The HTTP URL for this repository
  pushedAt: any | null // Identifies when the repository was last pushed to.
  isArchived: boolean // Indicates if the repository is unmaintained.
  package: Project_package | null // A Git object in the repository
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Projects
// ====================================================

export interface Projects_nodes_package_Commit {}

export interface Projects_nodes_package_Blob {
  id: string
  text: string | null // UTF8 text data or null if the Blob is binary
}

export type Projects_nodes_package =
  | Projects_nodes_package_Commit
  | Projects_nodes_package_Blob

export interface Projects_nodes {
  id: string
  name: string // The name of the repository.
  url: any // The HTTP URL for this repository
  pushedAt: any | null // Identifies when the repository was last pushed to.
  isArchived: boolean // Indicates if the repository is unmaintained.
  package: Projects_nodes_package | null // A Git object in the repository
}

export interface Projects {
  nodes: (Projects_nodes | null)[] | null // A list of nodes.
  totalCount: number // Identifies the total count of items in the connection.
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//= =============================================================
// START Enums and Input Objects
//= =============================================================

//= =============================================================
// END Enums and Input Objects
//= =============================================================
