/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Repositories
// ====================================================

export interface Repositories_search_pageInfo {
  endCursor: string | null // When paginating forwards, the cursor to continue.
  hasNextPage: boolean // When paginating forwards, are there more items?
  hasPreviousPage: boolean // When paginating backwards, are there more items?
  startCursor: string | null // When paginating backwards, the cursor to continue.
}

export interface Repositories_search_nodes_Issue {}

export interface Repositories_search_nodes_Repository_object_Commit {}

export interface Repositories_search_nodes_Repository_object_Blob {
  byteSize: number // Byte size of Blob object
  text: string | null // UTF8 text data or null if the Blob is binary
}

export type Repositories_search_nodes_Repository_object =
  | Repositories_search_nodes_Repository_object_Commit
  | Repositories_search_nodes_Repository_object_Blob

export interface Repositories_search_nodes_Repository {
  id: string
  name: string // The name of the repository.
  nameWithOwner: string // The repository's name with owner.
  url: any // The HTTP URL for this repository
  pushedAt: any | null // Identifies when the repository was last pushed to.
  object: Repositories_search_nodes_Repository_object | null // A Git object in the repository
}

export type Repositories_search_nodes =
  | Repositories_search_nodes_Issue
  | Repositories_search_nodes_Repository

export interface Repositories_search {
  repositoryCount: number // The number of repositories that matched the search query.
  pageInfo: Repositories_search_pageInfo // Information to aid in pagination.
  nodes: (Repositories_search_nodes | null)[] | null // A list of nodes.
}

export interface Repositories_rateLimit {
  limit: number // The maximum number of points the client is permitted to consume in a 60 minute window.
  cost: number // The point cost for the current query counting against the rate limit.
  remaining: number // The number of points remaining in the current rate limit window.
  resetAt: any // The time at which the current rate limit window resets in UTC epoch seconds.
}

export interface Repositories {
  search: Repositories_search // Perform a search across resources.
  rateLimit: Repositories_rateLimit | null // The client's rate limit information.
}

export interface RepositoriesVariables {
  query: string
  after?: string | null
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

//= =============================================================
// START Enums and Input Objects
//= =============================================================

//= =============================================================
// END Enums and Input Objects
//= =============================================================
